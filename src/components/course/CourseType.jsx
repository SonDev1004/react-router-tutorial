import {useParams} from "react-router-dom";

export default function CourseType() {
    const params = useParams();
    const courseType = params.courseType;
    return (
        <div>
            <h1>Course Type Page with Course Type: {courseType}</h1>
        </div>
    );
};