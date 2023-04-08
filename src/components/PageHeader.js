import { useEffect } from "react";
import { useAppContext } from '../context/AppContext';


const PageHeader = ({title}) => {
    const {
        updateData,
      } = useAppContext();
    useEffect(() => {
        // Clear the specific state when the component mounts
        updateData([]);
      }, [updateData]);
      //empty the book cards the page loads
    return (
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="mt-4">{title}</h1>
        </div>
      </div>
    );
  };
  
  export default PageHeader;