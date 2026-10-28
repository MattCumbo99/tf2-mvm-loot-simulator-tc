import type React from "react";
import type { LootItem } from "../../types/loot-item";
import "./LootItemCard.css";

interface Props {
  item: LootItem;
}

export const LootItemCard: React.FC<Props> = ({ item }) => {
  // Convert to rarity string for CSS class matching
  const rarityClass = `rarity-${item.rarity.toLowerCase()}`;

  return (
    <div className={`loot-card ${rarityClass}`}>
      <div className="loot-card-header">
        <span className="rarity-tag">{item.rarity}</span>
      </div>

      <div className="loot-card-media">
        {item.image ? (
          <img
            src={`${import.meta.env.BASE_URL}${item.image}`}
            alt={item.name}
            className="item-image"
          />
        ) : (
          <div className="item-image-placeholder">
            <span>{item.name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="loot-card-content">
        <h4 className="item-name" title={item.name}>
          {item.name}
        </h4>

        {/* Display Sheen & Killstreaker effects if present */}
        {(item.sheen || item.killstreaker) && (
          <div className="item-effects">
            {item.sheen && (
              <span
                className="effect-tag sheen-tag"
                title={`Sheen: ${item.sheen}`}
              >
                ✨ {item.sheen}
              </span>
            )}
            {item.killstreaker && (
              <span
                className="effect-tag killstreaker-tag"
                title={`Killstreaker: ${item.killstreaker}`}
              >
                🔥 {item.killstreaker}
              </span>
            )}
          </div>
        )}

        <div className="item-price">${item.price.toFixed(2)}</div>
      </div>
    </div>
  );
};
