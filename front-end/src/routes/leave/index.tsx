import BreadCrumps from "@/components/Nav/BreadCrumps";
import SearchData from "@/layout/SearchData";
import TableLayout from "@/layout/Table";

export default function LeavePage() {
  return (
    <>
      <div className="container" style={{ marginTop: "50px" }}>
        <BreadCrumps />
        <SearchData />
        <TableLayout></TableLayout>
      </div>
    </>
  );
}
