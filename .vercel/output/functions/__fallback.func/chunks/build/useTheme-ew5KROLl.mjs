import { watch, ref } from 'vue';

function parseRevenue(val) {
  if (val === null || val === void 0) return 0;
  if (typeof val === "number") return val;
  return Number(val.replace(/[^0-9.-]+/g, ""));
}
function getFounderSlug(name) {
  if (!name) return "";
  return name.replace(/[^a-zA-Z0-9 ]/g, "").trim().replace(/\s+/g, "-").toLowerCase();
}
function isValidFounder(founderName) {
  return Boolean(
    founderName && founderName !== "null," && founderName.length > 2
  );
}
function formatFollowers(count) {
  if (!count) return "0";
  const num = Number(String(count).replace(/,/g, ""));
  if (isNaN(num)) return String(count);
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
  return num.toLocaleString();
}
function isValidGrowth(growth) {
  if (growth === null || growth === void 0) return false;
  if (typeof growth === "number") return true;
  return growth.includes("%");
}
function formatCurrency(val) {
  if (val === null || val === void 0) return "$0";
  if (typeof val === "number") {
    return "$" + val.toLocaleString();
  }
  if (!val.includes("$")) {
    const num = parseRevenue(val);
    return "$" + num.toLocaleString();
  }
  return val;
}
function formatGrowth(growth) {
  if (growth === null || growth === void 0) return "";
  let num;
  if (typeof growth === "number") {
    num = growth;
  } else {
    const cleaned = growth.replace("%", "").trim();
    num = parseFloat(cleaned);
    if (isNaN(num)) return "";
  }
  if (num === 0) return "0%";
  if (num > 0) return `+${num}%`;
  return `${num}%`;
}
const themeColor = ref("blue");
function useTheme() {
  function setTheme(color) {
    themeColor.value = color;
  }
  function toggleTheme() {
    setTheme(themeColor.value === "blue" ? "white" : "blue");
  }
  watch(themeColor, (newColor) => {
  }, { immediate: true });
  return {
    themeColor,
    setTheme,
    toggleTheme
  };
}

export { formatFollowers as a, isValidGrowth as b, formatGrowth as c, formatCurrency as f, getFounderSlug as g, isValidFounder as i, parseRevenue as p, useTheme as u };
//# sourceMappingURL=useTheme-ew5KROLl.mjs.map
