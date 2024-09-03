import { addNavMenuSection } from "@vendure/admin-ui/core";

export default [
  addNavMenuSection(
    {
      id: "example",
      label: "Example Plugin",
      items: [
        {
          id: "example",
          label: "Example Route",
          routerLink: ["/extensions/example"],
        },
      ],
      requiresPermission: "ReadExample",
    },
    "sales",
  ),
];
