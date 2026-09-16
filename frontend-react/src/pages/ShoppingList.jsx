import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShoppingList.css";


function ShoppingList() {

    const navigate = useNavigate();


    const [items, setItems] = useState(() => {

        try {

            const saved =
                localStorage.getItem(
                    "smartCartShoppingList"
                );

            return saved
                ? JSON.parse(saved)
                : [];

        } catch {

            return [];

        }

    });


    const [productName, setProductName] =
        useState("");


    const [quantity, setQuantity] =
        useState(1);


    const saveItems = (updatedItems) => {

        setItems(updatedItems);

        localStorage.setItem(
            "smartCartShoppingList",
            JSON.stringify(updatedItems)
        );

    };


    const addItem = (event) => {

        event.preventDefault();

        const name = productName.trim();

        if (!name) {
            return;
        }


        const existingItem = items.find(
            (item) =>
                item.name.toLowerCase() ===
                name.toLowerCase()
        );


        if (existingItem) {

            const updatedItems = items.map(
                (item) =>
                    item.id === existingItem.id
                        ? {
                              ...item,
                              quantity:
                                  item.quantity +
                                  Number(quantity)
                          }
                        : item
            );

            saveItems(updatedItems);

        } else {

            const newItem = {

                id: Date.now(),

                name,

                quantity: Number(quantity),

                purchased: false

            };


            saveItems([
                ...items,
                newItem
            ]);

        }


        setProductName("");

        setQuantity(1);

    };


    const togglePurchased = (id) => {

        const updatedItems = items.map(
            (item) =>
                item.id === id
                    ? {
                          ...item,
                          purchased:
                              !item.purchased
                      }
                    : item
        );


        saveItems(updatedItems);

    };


    const removeItem = (id) => {

        const updatedItems =
            items.filter(
                (item) => item.id !== id
            );


        saveItems(updatedItems);

    };


    const clearPurchased = () => {

        const updatedItems =
            items.filter(
                (item) => !item.purchased
            );


        saveItems(updatedItems);

    };


    const totalItems = items.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    const pendingItems =
        items.filter(
            (item) => !item.purchased
        );


    const purchasedItems =
        items.filter(
            (item) => item.purchased
        );


    return (

        <main className="shopping-list-page">

            {/* HEADER */}

            <header className="shopping-list-header">

                <div className="shopping-list-brand">

                    <div className="shopping-list-brand-mark">
                        SC
                    </div>

                    <div>

                        <h2>
                            Smart<span>Cart</span>
                        </h2>

                        <p>
                            SMART SHOPPING
                        </p>

                    </div>

                </div>


                <button
                    className="shopping-list-back"
                    onClick={() =>
                        navigate("/customer")
                    }
                >
                    ← Dashboard
                </button>

            </header>


            {/* MAIN */}

            <div className="shopping-list-container">

                {/* TITLE */}

                <section className="shopping-list-heading">

                    <p>
                        SHOPPING PLANNER
                    </p>

                    <h1>
                        Your shopping list
                    </h1>

                    <span>
                        Plan your products before you
                        start shopping.
                    </span>

                </section>


                {/* SUMMARY */}

                <section className="shopping-summary">

                    <div className="summary-item">

                        <span>
                            TOTAL
                        </span>

                        <strong>
                            {totalItems}
                        </strong>

                    </div>


                    <div className="summary-divider"></div>


                    <div className="summary-item">

                        <span>
                            TO BUY
                        </span>

                        <strong>
                            {pendingItems.length}
                        </strong>

                    </div>


                    <div className="summary-divider"></div>


                    <div className="summary-item">

                        <span>
                            PURCHASED
                        </span>

                        <strong>
                            {purchasedItems.length}
                        </strong>

                    </div>

                </section>


                {/* ADD ITEM */}

                <section className="add-item-card">

                    <div className="add-item-heading">

                        <div className="add-icon">
                            +
                        </div>

                        <div>

                            <p>
                                ADD PRODUCT
                            </p>

                            <h2>
                                Build your list
                            </h2>

                        </div>

                    </div>


                    <form
                        className="add-item-form"
                        onSubmit={addItem}
                    >

                        <div className="product-input">

                            <label>
                                Product name
                            </label>

                            <input
                                type="text"
                                value={productName}
                                onChange={(event) =>
                                    setProductName(
                                        event.target.value
                                    )
                                }
                                placeholder="Example: Milk"
                            />

                        </div>


                        <div className="quantity-input">

                            <label>
                                Quantity
                            </label>

                            <input
                                type="number"
                                min="1"
                                max="99"
                                value={quantity}
                                onChange={(event) =>
                                    setQuantity(
                                        Math.max(
                                            1,
                                            Number(
                                                event.target.value
                                            )
                                        )
                                    )
                                }
                            />

                        </div>


                        <button
                            type="submit"
                            className="add-button"
                        >

                            <span>
                                Add product
                            </span>

                            <strong>
                                +
                            </strong>

                        </button>

                    </form>

                </section>


                {/* PRODUCTS */}

                <section className="list-section">

                    <div className="list-section-header">

                        <div>

                            <p>
                                YOUR PRODUCTS
                            </p>

                            <h2>
                                Shopping list
                            </h2>

                        </div>


                        {purchasedItems.length > 0 && (

                            <button
                                className="clear-button"
                                onClick={clearPurchased}
                            >
                                Clear purchased
                            </button>

                        )}

                    </div>


                    {items.length === 0 ? (

                        <div className="empty-list">

                            <div className="empty-icon">
                                +
                            </div>

                            <h3>
                                No products yet
                            </h3>

                            <p>
                                Add your first product
                                above.
                            </p>

                        </div>

                    ) : (

                        <div className="items-list">

                            {items.map(
                                (item) => (

                                    <article
                                        className={
                                            item.purchased
                                                ? "list-item purchased"
                                                : "list-item"
                                        }
                                        key={item.id}
                                    >

                                        <button
                                            className="item-check"
                                            onClick={() =>
                                                togglePurchased(
                                                    item.id
                                                )
                                            }
                                        >
                                            {item.purchased
                                                ? "✓"
                                                : ""}
                                        </button>


                                        <div className="item-details">

                                            <h3>
                                                {item.name}
                                            </h3>

                                            <span>
                                                Quantity:{" "}
                                                {item.quantity}
                                            </span>

                                        </div>


                                        <div className="item-status">

                                            {item.purchased
                                                ? "PURCHASED"
                                                : "TO BUY"}

                                        </div>


                                        <button
                                            className="delete-item"
                                            onClick={() =>
                                                removeItem(
                                                    item.id
                                                )
                                            }
                                        >
                                            ×
                                        </button>

                                    </article>

                                )
                            )}

                        </div>

                    )}

                </section>


                {/* START SHOPPING */}

                <section className="shopping-flow">

                    <div>

                        <p>
                            READY TO SHOP?
                        </p>

                        <h2>
                            Take your list to the trolley
                        </h2>

                    </div>


                    <button
                        className="start-shopping-button"
                        onClick={() =>
                            navigate("/scanner")
                        }
                    >

                        <span>
                            Start shopping
                        </span>

                        <strong>
                            →
                        </strong>

                    </button>

                </section>


                {/* BUDGET */}

                <section className="budget-link-card">

                    <div className="budget-link-icon">
                        ₹
                    </div>

                    <div>

                        <p>
                            SHOPPING BUDGET
                        </p>

                        <h3>
                            Control your spending
                        </h3>

                        <span>
                            Set a budget for this shopping
                            session.
                        </span>

                    </div>


                    <button
                        onClick={() =>
                            navigate("/budget")
                        }
                    >
                        Set budget →
                    </button>

                </section>

            </div>


            <footer className="shopping-list-footer">

                <span>
                    SMARTCART
                </span>

                <p>
                    Scan · Verify · Pay · Go
                </p>

            </footer>

        </main>

    );
}


export default ShoppingList;