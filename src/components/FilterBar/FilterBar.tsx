import {
  selectSelectedLabel,
  selectAllTasks,
} from "../../../src/features/crmSelectors";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setLabelFilter } from "../../features/crmSlice";
import { FilterBarStyle, FilterButton } from "../FilterBar/FilterBar.styles";

function FilterBar() {
  const dispatch = useAppDispatch();
  const allRawTasks = useAppSelector(selectAllTasks);

  const uniqueLabels = Array.from(
    new Set(allRawTasks.flatMap((task) => task.labels)),
  );
  const activeLabel = useAppSelector(selectSelectedLabel);

  return (
    <FilterBarStyle>
      <FilterButton
        $active={activeLabel === null}
        $activeColor="#1e293b"
        onClick={() => dispatch(setLabelFilter(null))}
      >
        Все задачи
      </FilterButton>

      {uniqueLabels.map((label) => (
        <FilterButton
          key={label}
          $active={activeLabel === label}
          $activeColor="#3b82f6"
          onClick={() => dispatch(setLabelFilter(label))}
        >
          #{label}
        </FilterButton>
      ))}
    </FilterBarStyle>
  );
}

export default FilterBar;
