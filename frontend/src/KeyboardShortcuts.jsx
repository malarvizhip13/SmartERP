import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function KeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!e.ctrlKey) return;

      switch (e.key.toLowerCase()) {
        case "d":
          e.preventDefault();
          navigate("/");
          break;

        case "c":
          e.preventDefault();
          navigate("/company");
          break;

        case "l":
          e.preventDefault();
          navigate("/ledger");
          break;

        case "g":
          e.preventDefault();
          navigate("/group");
          break;

        case "s":
          e.preventDefault();
          navigate("/stock");
          break;

        case "p":
          e.preventDefault();
          navigate("/purchase");
          break;

        case "b":
          e.preventDefault();
          navigate("/billing");
          break;

        case "r":
          e.preventDefault();
          navigate("/reports");
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return null;
}

export default KeyboardShortcuts;