import NavBar from "./NavBar";

function NoDataView() {
  return (
    <>
      <NavBar />

      <div className="container-fluid h-100 w-100 p-1 m-5 text-center text-white bg-dark">
        Please Add Some Data 😁.
      </div>
    </>
  );
}

export default NoDataView;
