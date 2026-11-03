import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Grids(props) {
  const rowNumbersLocal=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  const columnNamesLocal=['A','B','C','D'];
  
  const rowNumbersRegional=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  const columnNamesRegional=['A','B','C','D','E'];

  const rowNumbersInternational=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
  const columnNamesInternational=['A','B','C','D','E','F'];
  
  const handleCheckboxClick = (event) => {
    const checkboxID = event.target.id;
    const isChecked = document.getElementById(checkboxID).checked;
    
    switch (props.selectedAirplane) {
      case 'local':
        if(isChecked){
          props.setrequestedSeats1(prevArray => [...prevArray, checkboxID]);
        }
        else{
          props.setrequestedSeats1(prevArray => prevArray.filter(item => item !== checkboxID));
        }
        break;
      case 'regional':
        if(isChecked){
          props.setrequestedSeats2(prevArray => [...prevArray, checkboxID]);
        }
        else{
          props.setrequestedSeats2(prevArray => prevArray.filter(item => item !== checkboxID));
        }
        break;
      case 'international':
        if(isChecked){
          props.setrequestedSeats3(prevArray => [...prevArray, checkboxID]);
        }
        else{
          props.setrequestedSeats3(prevArray => prevArray.filter(item => item !== checkboxID));
        }
        break;
      default:
        break;}
  };
    return (
              <>
                {
                
                props.selectedAirplane.substring(0,5)==='local'?
                rowNumbersLocal.map((currElement,index)=> <CreateGrids rowNumber={rowNumbersLocal[index]} columnNames={columnNamesLocal} handleCheckboxClick={handleCheckboxClick} /> ):
              
                props.selectedAirplane.substring(0,5)==='regio'?
                rowNumbersRegional.map((currElement,index)=> <CreateGrids rowNumber={rowNumbersRegional[index]} columnNames={columnNamesRegional} handleCheckboxClick={handleCheckboxClick} /> ):
              
                rowNumbersInternational.map((currElement,index)=> <CreateGrids rowNumber={rowNumbersInternational[index]} columnNames={columnNamesInternational} handleCheckboxClick={handleCheckboxClick} /> )                
                }
              </>
    )
  }

  function CreateGrids(props) {
    
    const rowLength ="row row-cols-"+ props.columnNames.length;// props.singleRowLength ;
    return (
      <>
          <div class="container text-center">
            <div class= {rowLength} >
              {props.columnNames.map((currElement,index)=> <CreateRow cellNames={props.rowNumber + props.columnNames[index]} handleCheckboxClick={props.handleCheckboxClick}  />)}
            </div>
          </div>
      </>
    );
  }

  function CreateRow(props) {
      return (
        <>
          <div class="col bg-secondary border">
          
            <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id={props.cellNames}
                  onClick={props.handleCheckboxClick}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                {props.cellNames}
                </label>
            </div>
          
          </div>
        </>
      );
    }

  export default Grids
