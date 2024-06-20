import {
  Route,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Root from "./routes/Root";
import Home from "./routes/Home";

import LeavePage from "./routes/leave";
import AddLeave from "./routes/leave/add";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route index={true} element={<Home />}></Route>

        {/* leave page */}
        <Route path="/leave">
          <Route index={true} element={<LeavePage />} />
          <Route path="create" element={<AddLeave />} />
        </Route>
        {/* leave page */}
      </Route>
    </>
  )
);
