const breadcrumb = {
  breadcrumbs: [
    { id: 0, name: "Home", href: "#" },
    { id: 1, name: "Convites", href: "#" },
    { id: 2, name: "Clássicos", href: "#" },
  ],
};

export default function Breadcrumbs() {
  return (
    <>
      {breadcrumb.breadcrumbs.map((breadcrumb) => (
        <li key={breadcrumb.id}>
          <div className="flex items-center">
            <a
              href={breadcrumb.href}
              className="mr-4 text-sm font-medium text-gray-900"
            >
              {breadcrumb.name}
            </a>
            <svg
              viewBox="0 0 6 20"
              aria-hidden="true"
              className="h-5 w-auto text-gray-300"
            >
              <path
                d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                fill="currentColor"
              />
            </svg>
          </div>
        </li>
      ))}
    </>
  );
}
