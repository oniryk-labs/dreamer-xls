// create a proxy for the response object
export const responseProxy = () => {
  return new Proxy(
    { state: { body: null as string | null, headers: [] as any[] } },
    {
      get: (target, prop) => {
        if (prop === "state") {
          return target.state;
        }

        return (...data: any[]) => {
          if (prop === "send") {
            target.state.body = data[0];
          } else if (prop === "header") {
            target.state.headers?.push(data);
          }
        };
      },
    },
  );
};
