import { reactive } from "vue";
import { useQuery } from "vue-query";

const useTestQuery = () => {
  const showTestQuery = reactive({ data: {} });

  const { data: queryFriends } = useQuery("test-query", () => {
    showTestQuery.data = { data: "test_query" };
    return showTestQuery.data;
  });

  return [queryFriends] as const;
};

export default useTestQuery;
