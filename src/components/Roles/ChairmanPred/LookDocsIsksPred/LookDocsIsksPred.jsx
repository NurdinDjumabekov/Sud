import React from "react";
import { useSelector } from "react-redux";

const LookDocsIsksPred = () => {
  const { applicationList } = useSelector((state) => state.applicationsSlice);
  return (
    <div className="">
      {applicationList.map((docs) => (
        <div key={+docs?.codeid} className="applicationFiles__inner">
          <div
            className="clickInputFile"
            onClick={() => handleButtonClick(docs?.codeid)}
          >
            <input
              id={`fileInput-${+docs?.codeid}`}
              type="file"
              onChange={(e) => handleFileChange(docs?.codeid, e)}
              style={{ display: "none" }}
              multiple
              disabled={+decodedToken?.type_user === 4 ? false : true}
            />
            <button>Добавить</button>
            <span>
              {docs?.name}{" "}
              <b className="required" style={{ fontSize: "22px" }}>
                *
              </b>
            </span>
          </div>
          <div className="filesBlock">
            {docs?.arrDocs.map((file) => (
              <div key={+file?.codeid_file} className="file-item">
                {/* <span >{file.name}</span> */}
                <LookDocs file={file} key={file?.codeid_file} />
                {+decodedToken?.type_user === 4 && (
                  <button
                    onClick={() => {
                      dispatch(
                        deleteDocsIsks({
                          file: file?.codeid_file,
                          tokenA,
                          code_isk: todosApplications.codeid,
                        })
                      );
                    }}
                  >
                    <img src={krestik} alt="x" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LookDocsIsksPred;
