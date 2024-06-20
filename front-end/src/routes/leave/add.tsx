import BreadCrumps from "@/components/Nav/BreadCrumps";
import GenericAdd from "@/layout/GenericAdd";
// import SearchData from "@/layout/SearchData";
// import TableLayout from "@/layout/Table";

export default function AddLeave() {
  return (
    <>
      <div className="container" style={{ marginTop: "50px" }}>
        <BreadCrumps />
        <GenericAdd navigateTo="/leave" />
      </div>
    </>
  );
}
