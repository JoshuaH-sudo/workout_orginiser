import { EuiFlexItem, EuiCard, EuiIcon, EuiFlexGroup } from "@elastic/eui";
import { FC } from "react";
import { Workout, Workout_store } from "../store/workouts";
import { v4 } from "uuid";

const Workout_list: FC = () => {
    const Workouts = Workout_store.getInstance();
    const workout_display_list = Workouts.workouts.map((workout) => (
        <EuiFlexItem key={workout.id}>
            <Workout_item workout={workout} />
        </EuiFlexItem>
    ));

    workout_display_list.push(<Add_workout />);

    return <EuiFlexGroup gutterSize="l">{workout_display_list}</EuiFlexGroup>;
};

const Add_workout: FC = () => {
    return <EuiCard title="" icon={<EuiIcon size="xxl" type="plus" />} href={`workout/${v4()}`} />;
};

interface Workout_item_props {
    workout: Workout

}
const Workout_item: FC<Workout_item_props> = ({ workout }) => {
    return <EuiCard title={`${workout.name}`} description="Example of a card's description. Stick to one or two sentences." href={`workout/${workout.id}`} />;
};

export default Workout_list;
