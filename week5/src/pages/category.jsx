// home.jsx
import { Outlet } from "react-router-dom";
import Select from "../components/select";

const CategoryPage = () => {
    return (
        <>
            <h1>카테고리</h1>
            <Select/>
            {/* Outlet을 추가하여 자식 라우트를 렌더링합니다 */}
            <Outlet />
        </>
        
    );
};

export default CategoryPage;