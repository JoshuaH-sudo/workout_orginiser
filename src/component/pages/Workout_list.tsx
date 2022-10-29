import { EuiFlexItem, EuiCard, EuiIcon, EuiFlexGroup } from "@elastic/eui";
import { FC } from "react";
import { Workout, workouts } from "../store/workouts";
import { v4} from "uuid"

const Workout_list: FC = () => {
  const workout_display_list = workouts.map((workout) => (
    <EuiFlexItem key={workout.id}>
      <Workout_item {...workout} />
    </EuiFlexItem>
  ));

  workout_display_list.push(<Add_workout />);

  return <EuiFlexGroup gutterSize="l">{workout_display_list}</EuiFlexGroup>;
};

const Add_workout: FC = () => {
  return (
    <EuiCard
      title=""
      icon={<EuiIcon size="xxl" type="plus" />}
      href={`item/${v4()}`}
    />
  );
};

const Workout_item: FC<Workout> = ({ id, name }) => {
  return (
    <EuiCard
      title={`${name}`}
      description="Example of a card's description. Stick to one or two sentences."
      href={`item/${id}`}
    />
  );
};

export default Workout_list;
