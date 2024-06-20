import { IoMdArrowRoundBack } from "react-icons/io";
import { Form, useNavigate } from "react-router-dom";

export default function GenericAdd({ navigateTo }: { navigateTo: string }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="card">
        <div className="card-body">
          <button
            className="btn btn-outline-primary"
            onClick={() =>
              navigate(navigateTo, { unstable_viewTransition: true })
            }
          >
            <IoMdArrowRoundBack /> Back
          </button>
          <div className="mt-4">
            <Form>
              <fieldset>
                <legend>Add new</legend>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Check me out
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
