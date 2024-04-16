import PointsBuy from "@/components/sub_componnets/points";
import getAllPoints from "@/utils/data/get-points";

type Points = {
    points: number;
    amount: number;
    points_buy_id: string;
}

const Points = async () => {
    const points: Points[] = await getAllPoints()
    return (
        <div>
            <div className="p-4">
                <h1 className="font-bold text-2xl mb-10 pt-4">
                    Points
                </h1>
                <div className="grid grid-cols-3 gap-3 md:gap-6">
                    {points.map((point, index) => (
                        <PointsBuy key={index} point={point} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Points;