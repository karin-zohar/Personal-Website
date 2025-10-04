import GenSection from "@/libs/ui/components/GenSection/GenSection";
import MainLayout from "./components/MainLayout/MainLayout";
import useStore from "./store/store";

function App() {
  const { sectionKeys, sectionRefs } = useStore();

  return (
    <MainLayout>
      {sectionKeys.map((key) => (
        <GenSection
          id={key}
          key={key}
          ref={sectionRefs[key]}
          className={`section-${key}`}
        >
          <h2>{key}</h2>
        </GenSection>
      ))}
    </MainLayout>
  );
}

export default App;
