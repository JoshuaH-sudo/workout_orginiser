import { EuiFlexItem, EuiCard, EuiIcon, EuiFlexGroup } from "@elastic/eui";
import { FC } from "react";

type Workout = {
  id: string;
  name: string;
};

const Workout_list: FC = () => {
  const workouts: Workout[] = [
    {
      id: "1",
      name: "Workout 1",
    },
    {
      id: "2",
      name: "Workout 2",
    },
  ];

  const workout_display_list = workouts.map((workout) => (
    <EuiFlexItem key={workout.id}>
      <Workout_item {...workout} />
    </EuiFlexItem>
  ));

  workout_display_list.push(<Add_workout/>)

  return <EuiFlexGroup gutterSize="l">{workout_display_list}</EuiFlexGroup>;
};

const Add_workout: FC = () => {
  return (
    <EuiCard
      title=""
      icon={<EuiIcon size="xxl" type="plus" />}
      onClick={() => {}}
    />
  );
};

const Workout_item: FC<Workout> = ({ id, name }) => {
  return (
    <EuiCard
      title={`${name}`}
      description="Example of a card's description. Stick to one or two sentences."
      onClick={() => {}}
    />
  );
};

export default Workout_list;
