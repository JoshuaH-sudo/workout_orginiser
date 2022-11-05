import { useAppSelector, useAppDispatch } from "../component/store/hooks";
import { Pages, switch_page } from "../component/store/slices/router_slice";

const useRouter = () => {
  const router = useAppSelector((state) => state.router);
  const dispatch = useAppDispatch();

  const go_to_page = (current_page: Pages, current_page_props: any) => {
    dispatch(switch_page({ current_page, current_page_props }));
  };

  return { go_to_page, router };
};

export default useRouter;
