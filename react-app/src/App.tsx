// import ListGroup from "./components/ListGroup";
import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
function App() {
  const [alertVisible, setAlertVisibility] = useState(false);
  // let items = ["Bagbazar", "Mhepi", "Boudha", "Samakhusi", "Bhaktapur"];
  // const handleSelectItem = (item: string) => {
  //   console.log(item);
  // };
  return (
    <div>
      {/* <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      ></ListGroup> */}
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>Button Clicked</Alert>
      )}
      <Button onClick={() => setAlertVisibility(true)}>
        Primary color button
      </Button>
    </div>
  );
}
export default App;
