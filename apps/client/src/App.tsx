import GenSection from "@/libs/ui/components/GenSection/GenSection";
import MainLayout from "./components/MainLayout/MainLayout";
import useStore from "./store/store";

function App() {
  const { sectionKeys, sectionRefs } = useStore();

  return (
    <MainLayout>
      {sectionKeys.map((key) => (
        <GenSection id={key} key={key} ref={sectionRefs[key]}>
          <h2>{key}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            perferendis tenetur eum quos harum nesciunt eaque officia inventore
            assumenda expedita? Veniam, officia. Ut odit nostrum voluptatibus
            deserunt eum, ullam in?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            perferendis tenetur eum quos harum nesciunt eaque officia inventore
            assumenda expedita? Veniam, officia. Ut odit nostrum voluptatibus
            deserunt eum, ullam in?
          </p>
        </GenSection>
      ))}
    </MainLayout>
  );
}

export default App;
