import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { productData } from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [productStats, setProductStats] = useState([]);
    const product = useSelector((state) => state.product.products.find(product => product._id === productId));

    const MONTHS = useMemo(() =>
        [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC"
        ], []);

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get('orders/income?pid=' + productId);
                console.log(res)
                res.data.map((item) => {
                    setProductStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                })
            } catch (err) {
                console.log(err)
            }
        }
        getStats();
    }, [productId, MONTHS]);
    console.log(productStats)

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={productStats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">5123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">In Stock:</span>
                            <span className="productInfoValue">{product.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" placeholder={product.title} />
                        <label>Product Description</label>
                        <input type="text" placeholder={product.description} />
                        <label>Product Price</label>
                        <input type="text" placeholder={product.price} />
                        <label>In Stock</label>
                        <select name="inStock" id="idStock">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
