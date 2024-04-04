export const followLink = (typeUser, navigate) => {
  switch (+typeUser) {
    case 1:
      navigate("/mainSimpSecr");
      break;
    case 2:
      navigate("/mainRespSec");
      break;
    case 3:
      navigate("/mainRespPred");
      break;
    case 4:
      navigate("/mainPlaintiff");
      break;
    default:
      navigate("/");
      break;
  }
};
