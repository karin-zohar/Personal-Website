import GenSection from "@/libs/ui/components/GenSection/GenSection";
import MainLayout from "./components/MainLayout/MainLayout";
import useStore from "./store/store";

function App() {
  const { sectionKeys, sectionRefs } = useStore();

  return (
    <MainLayout>
      {sectionKeys.map((key) => (
        <GenSection id={key} key={key} ref={sectionRefs[key]}>
          {key}
        </GenSection>
      ))}
    </MainLayout>
  );
}

export default App;
