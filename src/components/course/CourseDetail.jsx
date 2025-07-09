import {useParams} from "react-router-dom";

export const CourseDetail = () => {
    const params = useParams();

    return (
        <div>
            <h2>Chi tiết khóa học: {params.courseId} - CourseType: {params.courseType}</h2>
        </div>
    );
};