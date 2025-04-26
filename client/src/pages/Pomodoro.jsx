import TasksProvider from "../context/TasksContext";
import Container from "../components/Container";
import Header from "../components/Header";
import PomoTasks from "../components/PomoTasks";
import Timer from "../components/Timer";

function Pomodoro() {
  return (
    <Container>
      <Header />
      <TasksProvider>
        <Timer />
        <PomoTasks />
      </TasksProvider>
    </Container>
  );
}

export default Pomodoro;
