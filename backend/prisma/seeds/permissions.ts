import { PrismaClient } from '@prisma/client';

export async function permissions(prisma: PrismaClient) {
  try {
    const notAllowedToRunSeed = process.env.RUN_SEED_PERMISSIONS === 'false';

    await prisma.permissionRole.deleteMany({});
    await prisma.permission.deleteMany({});
    await prisma.menuItem.deleteMany({});
    if (notAllowedToRunSeed) return;

    await prisma.menuItem.createMany({
      data: [
        {
          name: 'Início',
          webUrl: '/system/home',
          webUrlBase: 'home',
          modelName: 'home',
          icon: 'HomeIcon',
          order: 1,
        },
        {
          name: 'Categoria do Produto',
          webUrl: '/system/categoria-produto',
          webUrlBase: 'categoria-produto',
          modelName: 'productCategory',
          icon: 'QuestionMarkCircleIcon',
          order: 2,
        },
        {
          name: 'Sub Categoria',
          webUrl: '/system/sub-categoria',
          webUrlBase: 'sub-categoria',
          modelName: 'subcategories',
          icon: 'QuestionMarkCircleIcon',
          order: 3,
        },
        {
          name: 'Produto',
          webUrl: '/system/produto',
          webUrlBase: 'produto',
          modelName: 'product',
          icon: 'GiftIcon',
          order: 4,
        },
        {
          name: 'Usuários',
          webUrl: '/system/usuarios',
          webUrlBase: 'usuarios',
          modelName: 'user',
          icon: 'UsersIcon',
          order: 5,
        },
        {
          name: 'Configuração',
          webUrl: '/system/configuracao',
          webUrlBase: 'configuracao',
          modelName: 'configuration',
          icon: 'Cog6ToothIcon',
          order: 6,
        },
        {
          name: 'Níveis de acesso',
          webUrl: '/system/nivel-acesso',
          webUrlBase: 'niveis-acesso',
          modelName: 'permission',
          icon: 'LockClosedIcon',
          order: 7,
        },
        {
          name: 'Categoria do Faq',
          webUrl: '/system/categoria-faq',
          webUrlBase: 'categoria-faq',
          modelName: 'faqCategory',
          icon: 'QuestionMarkCircleIcon',
          order: 8,
        },
        {
          name: 'Faq',
          webUrl: '/system/faqs',
          webUrlBase: 'faqs',
          modelName: 'faq',
          icon: 'QuestionMarkCircleIcon',
          order: 9,
        },
        {
          name: 'Tela inicial',
          webUrl: '/system/tela-inicial-site',
          webUrlBase: 'tela-inicial-site',
          modelName: 'homeScreen',
          icon: 'PencilSquareIcon',
          order: 10,
        },
        {
          name: 'Visitar site',
          webUrl: '/',
          webUrlBase: '/',
          modelName: 'visitWebSite',
          target: '_blank',
          icon: 'ArrowTopRightOnSquareIcon',
          order: 11,
        },
        {
          name: 'Perfil',
          webUrl: '/system/perfil',
          modelName: 'profile',
          order: 51,
          visible: false,
        },
      ],
    });

    await prisma.role.upsert({
      where: { code: 'admin' },
      create: {
        name: 'Administrador',
        code: 'admin',
      },
      update: {},
    });

    await prisma.role.upsert({
      where: { code: 'client' },
      create: {
        name: 'Cliente',
        code: 'client',
      },
      update: {},
    });

    const actions = ['MENU-ITEM', 'VIEW', 'CREATE', 'UPDATE', 'DELETE'];
    const menuItems = await prisma.menuItem.findMany({
      where: {
        active: true,
      },
    });

    for (let i = 0; i < menuItems.length; i++) {
      for (let j = 0; j < actions.length; j++) {
        if (
          ['visitWebSite'].includes(menuItems[i].modelName) &&
          actions[j] !== 'MENU-ITEM'
        ) {
          continue;
        }
        if (menuItems[i].modelName === 'permission' && actions[j] === 'DELETE') {
          continue;
        }

        if (
          ['configuration', 'homeScreen'].includes(menuItems[i].modelName) &&
          !['UPDATE', 'MENU-ITEM', 'VIEW'].includes(actions[j])
        ) {
          continue;
        }

        await prisma.permission.create({
          data: {
            action: actions[j],
            menuItemId: menuItems[i].id,
          },
        });
      }
    }

    const roles = await prisma.role.findMany();

    const permissionsAdmin = await prisma.permission.findMany();

    for (let i = 0; i < roles.length; i++) {
      for (let j = 0; j < permissionsAdmin.length; j++) {
        await prisma.permissionRole.create({
          data: {
            roleId: roles[i].id,
            permissionId: permissionsAdmin[j].id,
            allowed: true,
          },
        });
      }
    }
  } catch (error) {}
}
