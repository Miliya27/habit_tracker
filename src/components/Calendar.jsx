import { useState } from "react";

function Calendar() {
  const [currentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
const [entries, setEntries] = useState({});
  const [formData, setFormData] = useState({
    workout: "",
    sugar: false,
    note: "",
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handleDayClick = (day) => {
    if (!day) return;
    setSelectedDay(day);
    setShowModal(true);
  };

  const handleSave = () => {
  const key = `${year}-${month + 1}-${selectedDay}`;

  setEntries({
    ...entries,
    [key]: formData,
  });

  setShowModal(false);
  setFormData({ workout: "", sugar: false, note: "" });
};

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {currentDate.toLocaleString("default", { month: "long" })} {year}
      </h2>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
        <div
  key={index}
  onClick={() => handleDayClick(day)}
  className={`h-16 border rounded flex items-center justify-center cursor-pointer
  ${
    entries[`${year}-${month + 1}-${day}`]?.workout === "no"
      ? "bg-red-400"
      : entries[`${year}-${month + 1}-${day}`]?.workout === "good"
      ? "bg-yellow-300"
      : entries[`${year}-${month + 1}-${day}`]?.workout === "best"
      ? "bg-green-400"
      : day
      ? "bg-white hover:bg-gray-200"
      : ""
  }
`}
>
  {day}
</div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80">
            <h3 className="text-lg font-bold mb-4">
              Log for {selectedDay}
            </h3>

            {/* Workout */}
            <select
              className="w-full border p-2 mb-3"
              value={formData.workout}
              onChange={(e) =>
                setFormData({ ...formData, workout: e.target.value })
              }
            >
              <option value="">Select Workout</option>
              <option value="no">No</option>
              <option value="good">Good</option>
              <option value="best">Best</option>
            </select>

            {/* Sugar */}
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={formData.sugar}
                onChange={(e) =>
                  setFormData({ ...formData, sugar: e.target.checked })
                }
              />
              Sugar Consumed
            </label>

            {/* Notes */}
            <textarea
              className="w-full border p-2 mb-3"
              placeholder="Notes..."
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
            />

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;