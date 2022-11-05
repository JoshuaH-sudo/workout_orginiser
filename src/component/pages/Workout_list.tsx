import { EuiFlexItem, EuiCard, EuiIcon, EuiFlexGroup } from "@elastic/eui";
import { FC } from "react";
import { v4 } from "uuid";
import useRouter from "../../hooks/useRouter";
import useWorkouts from "../../hooks/useWorkouts";
import { Workout } from "../store/slices/database_slice";

const Workout_list: FC = () => {
  const { stored_workouts } = useWorkouts();
  const workout_display_list = stored_workouts.map((workout) => (
    <EuiFlexItem key={workout.id}>
      <Workout_item_card workout={workout} />
    </EuiFlexItem>
  ));

  workout_display_list.push(<Add_workout />);

  return <EuiFlexGroup gutterSize="l">{workout_display_list}</EuiFlexGroup>;
};

const Add_workout: FC = () => {
  return <EuiCard title="" icon={<EuiIcon size="xxl" type="plus" />} href={`workout/${v4()}`} />;
};

interface Workout_item_props {
  workout: Workout;
}
const Workout_item_card: FC<Workout_item_props> = ({ workout }) => {
  const { go_to_page } = useRouter();
  return <EuiCard title={`${workout.name}`} description="Example of a card" onClick={() => go_to_page("workout_item", { workout_id: workout.id })} />;
};

export default Workout_list;
