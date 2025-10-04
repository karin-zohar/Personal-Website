import GenSection from "@/libs/ui/components/GenSection/GenSection";
import MainLayout from "./components/MainLayout/MainLayout";
import useStore from "./store/store";

function App() {
  const { sectionKeys, sectionRefs, contentByKey } = useStore();

  return (
    <MainLayout>
      {sectionKeys.map((key) => (
        <GenSection
          id={key}
          key={key}
          ref={sectionRefs[key]}
          className={`section-${key}`}
        >
          {contentByKey[key]}
        </GenSection>
      ))}
    </MainLayout>
  );
}

export default App;
