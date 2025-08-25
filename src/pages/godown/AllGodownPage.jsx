import { useEffect } from "react";
import { AllGodown } from "../../components/layout/godown/AllGodown";
import { Layout } from "../../components/layout/Layout";
import { fetchGodowns } from "../../features/godownSlice";
import { useDispatch, useSelector } from "react-redux";

export const AllGodownPage = () => {
    const dispatch = useDispatch();

    const { godowns, loading, error } = useSelector((state) => state.godown);

    useEffect(() => {
        dispatch(fetchGodowns());
    }, [dispatch]);

    if (loading) return <p>Loading godowns...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Layout>
            <AllGodown godowns={godowns} />
        </Layout>
    );
};
