import { Link } from "react-router-dom";
import DataStrucuters from "./Utils/DataStrucuters.json";
import Algorithms from "./Utils/Algorithms.json";
import { ImageList } from "./Utils/Utils";
import { useDispatch } from "react-redux";
import { addQuestions } from "./Store/QuetionsSlice";
import DSShimmer from "./Shimmer/DSShimmer";
import AlgoShimmer from "./Shimmer/AlgoShimmer";
import { lazy, Suspense } from "react";
const Topic = lazy(() => import("./Components/Topic"))

export const AlgorithmsSize = "h-16 w-80 md:h-24 md:w-48"
export const DataStrucutersSize = "h-20 w-36 md:h-24 md:w-40"
const App = () => {
  const dispatch = useDispatch();

  const handleClick = (item) => {
    dispatch(addQuestions(item))
  }


  return (
    <div className="w-10/12 mx-auto text-2xl flex flex-col p-4 mt-4 md:mt-8 gap-4 mb-4">
      <header className="text-2xl text-slate-600 font-medium">Data Strucuters :</header>
      <div className="w-full flex flex-wrap justify-center gap-3 my-2 md:my-0 mx-auto  ">
        {
          DataStrucuters.map((item, idx) => (
            <Suspense key={item.topic} fallback={<DSShimmer />}>
              <Link to="/topic" onClick={() => handleClick(item)}>

                <Topic topicName={item.topic} imageSrc={ImageList[Math.floor(Math.random() * 11)]} size={DataStrucutersSize} />
              </Link>
            </Suspense>
          ))
        }
      </div>

      <header className="text-2xl text-slate-600 font-medium mt-8 my-2 md:my-0 md:mt-4">Algorithms :</header>
      <div className="w-full flex flex-wrap justify-center gap-4 mx-auto">
        {
          Algorithms.map((item, idx) => (

            <Suspense key={item.topic} fallback={<AlgoShimmer />}>
              <Link to="/topic" onClick={() => handleClick(item)}>
                <Topic topicName={item.topic} imageSrc={ImageList[Math.floor(Math.random() * 11)]} size={AlgorithmsSize} />
              </Link>
            </Suspense>
          ))
        }
      </div>
    </div >
  )
}

export default App;
