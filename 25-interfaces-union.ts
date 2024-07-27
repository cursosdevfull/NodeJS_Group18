interface Express {
  query: object;
  params: object;
}

interface Express {
  roles: string[];
  token: string;
}

const props: Express = {
  query: { page: 1 },
  params: { traceId: 10209 },
  roles: ["admin", "medico"],
  token: "43a81bfd-05c0-4fd2-9398-39f9517c7d36",
};
