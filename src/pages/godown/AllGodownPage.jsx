import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllGodown } from "../../components/layout/godown/AllGodown";
import { Layout } from "../../components/layout/Layout";

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
