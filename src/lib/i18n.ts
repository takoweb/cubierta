export const translations = {
  // Admin Navbar
  viewPublicSite: "メニューページを見る",
  logout: "ログアウト",
  // Home
  customizeStyle: "デザイン設定",
  hideStyleSettings: "デザイン設定を隠す",
  addNewDish: "メニューを追加",
  cancel: "キャンセル",
  dishManagement: "メニュー管理",
  editDish: "メニューを編集",
  // DishForm
  addMenuItem: "メニューを追加",
  editMenuItem: "メニューを編集",
  dishName: "料理名",
  description: "説明",
  price: "価格",
  category: "カテゴリー",
  saveChanges: "保存",
  // SearchHeader
  searchMenuItems: "メニューを検索...",
  views: "閲覧数",
  // StyleSettings
  styleSettings: "デザイン設定",
  colorTheme: "カラーテーマ",
  fontFamily: "フォント",
  titleSize: "見出しサイズ",
  textSize: "文字サイズ",
  restaurantLogo: "ロゴ",
  landingPageBackground: "背景画像",
  remove: "削除",
  small: "小",
  medium: "中",
  large: "大",
  extraLarge: "特大",
  selectFont: "フォントを選択",
  selectTitleSize: "見出しサイズを選択",
  selectTextSize: "文字サイズを選択",
  loading: "読み込み中...",
};

export const t = (key: keyof typeof translations) => {
  return translations[key];
};
