import React from "react";
import Checkbox from "../../common/checkbox/Checkbox";
import Dropdown from "../../common/dropdown/Dropdown";
import Slider from "../../common/slider/Slider";
import { FILTER_DROPDOWN_OPTIONS } from "../../helpers/common";
import "./filter.scss";

type FilterProps = {
  open: boolean;
  headerHeight?: number | null;
  selectValue: string;
  onSelectValueChange: (value: string) => void;
  sliderValue: number;
  onSliderValueChange: (value: number) => void;
  disableFilter: boolean;
  onSortByCreatedValueChange: (value: boolean) => void;
  sortByCreated: boolean;
};

const Filter: React.FC<FilterProps> = ({
  open,
  headerHeight,
  selectValue,
  onSelectValueChange,
  onSliderValueChange,
  sliderValue,
  sortByCreated,
  onSortByCreatedValueChange,
}) => {
  return (
    <div className="filter" style={{ top: `calc(${headerHeight}px - 30px)` }}>
      {open && (
        <>
          <div className="filter-options">
            <h2 className="filter-option-heading">Filter Options</h2>
            <div className="filter-controller">
              <div className="property">
                <h3>Select All, People or Planets</h3>
                <Dropdown
                  options={FILTER_DROPDOWN_OPTIONS}
                  value={selectValue}
                  onValueChange={onSelectValueChange}
                />
              </div>
              <div className="property">
                <h3>Sort By Created Date</h3>
                <Checkbox
                  checked={sortByCreated}
                  onChange={() => onSortByCreatedValueChange(!sortByCreated)}
                />
              </div>
              <div className="slider">
                <h3>Select by films count</h3>
                <Slider
                  value={sliderValue}
                  onValueChange={onSliderValueChange}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Filter);
