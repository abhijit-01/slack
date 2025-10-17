import { upsertStreamUser } from "./stream.js";

(async () => {
  const user = await upsertStreamUser({
    id: "test-user-123",
    name: "Test User",
    image: "https://i.pravatar.cc/150?img=3",
  });
  console.log("Returned user:", user);
})();
