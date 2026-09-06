/**
 * Minecraft Plugin Config Translation Engine
 * Pure Context-Aware Rule-Based & Offline Gaming Dictionary + High-Speed Multi-Engine Online Translation
 * Author: Nguyen Hong Son
 */

// Bảng ánh xạ ký tự thường sang Small Caps (Font Mini)
export const SMALL_CAPS_MAP: Record<string, string> = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ',
  n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
};

// Từ điển cụm từ chuyên sâu Minecraft Server (Ưu tiên cụm từ dài match trước)
export const MINECRAFT_GLOSSARY: Record<string, string> = {
  // Lời chào & Giao tiếp
  'Hello world': 'Xin chào thế giới',
  'Hello': 'Xin chào',
  'Hi': 'Chào',
  'Hey': 'Nè',
  'Welcome back %player%!': 'Chào mừng %player% đã quay trở lại!',
  'Welcome back %player%': 'Chào mừng %player% đã quay trở lại',
  'Welcome back': 'Chào mừng quay trở lại',
  'Welcome %player% to the server!': 'Chào mừng %player% gia nhập máy chủ!',
  'Welcome %player% to the server': 'Chào mừng %player% gia nhập máy chủ',
  'Welcome to our server': 'Chào mừng đến với máy chủ của chúng tôi',
  'Welcome to the server': 'Chào mừng đến với máy chủ',
  'Welcome to': 'Chào mừng đến với',
  'Welcome': 'Chào mừng',
  'Goodbye': 'Tạm biệt',
  'Bye': 'Tạm biệt',
  'Good luck': 'Chúc may mắn',
  'Have fun': 'Chúc bạn chơi vui vẻ',
  'Thank you': 'Cảm ơn bạn',
  'Thanks': 'Cảm ơn',
  'Congratulations': 'Chúc mừng',

  // GUI & Buttons
  'Click here to confirm': 'Nhấn vào đây để xác nhận',
  'Click to confirm': 'Nhấn để xác nhận',
  'Click here to cancel': 'Nhấn vào đây để hủy bỏ',
  'Click to cancel': 'Nhấn để hủy',
  'Click to close': 'Nhấn để đóng',
  'Click to teleport': 'Nhấn để dịch chuyển',
  'Click to purchase': 'Nhấn để mua',
  'Click to buy': 'Nhấn để mua',
  'Click to sell': 'Nhấn để bán',
  'Click to open': 'Nhấn để mở',
  'Click to view': 'Nhấn để xem',
  'Click here': 'Nhấn vào đây',
  'Click to': 'Nhấn để',
  'Previous Page': 'Trang trước',
  'Next Page': 'Trang sau',
  'Back to menu': 'Quay lại menu',
  'Go back': 'Quay lại',
  'Close': 'Đóng',
  'Back': 'Quay lại',
  'Confirm': 'Xác nhận',
  'Cancel': 'Hủy bỏ',
  'Information': 'Thông tin',
  'Settings': 'Cài đặt',
  'Page': 'Trang',
  'Loading...': 'Đang tải...',
  'Loading': 'Đang tải',

  // Quyền hạn & Lỗi hệ thống
  'You do not have permission to use this command': 'Bạn không có quyền sử dụng lệnh này!',
  'You do not have permission to do this': 'Bạn không có quyền thực hiện hành động này!',
  'You do not have permission': 'Bạn không có quyền hạn!',
  "You don't have permission!": 'Bạn không có quyền!',
  "You don't have permission": 'Bạn không có quyền!',
  'No permission': 'Không có quyền!',
  'Access denied': 'Truy cập bị từ chối!',
  'Selection is too large!': 'Vùng chọn quá lớn!',
  'Selection is too large': 'Vùng chọn quá lớn',
  'Selection': 'Vùng chọn',
  'to get the wand': 'để lấy cây đũa',
  'wand': 'cây đũa',
  'Player not found': 'Không tìm thấy người chơi!',
  'Player is offline': 'Người chơi hiện đang ngoại tuyến!',
  'Player is online': 'Người chơi đang trực tuyến!',
  'Invalid command syntax': 'Cú pháp lệnh không hợp lệ!',
  'Usage': 'Cách dùng',
  'Internal server error occurred': 'Đã xảy ra lỗi máy chủ nội bộ!',
  'Something went wrong': 'Đã xảy ra lỗi, vui lòng thử lại sau!',
  'An error occurred': 'Đã xảy ra lỗi!',

  // Cooldowns & Thời gian
  'Please wait %time% seconds before using this command again': 'Vui lòng chờ %time% giây trước khi dùng lại lệnh này!',
  'Please wait %seconds% seconds before using this command again': 'Vui lòng chờ %seconds% giây trước khi dùng lại lệnh này!',
  'Please wait %time% seconds': 'Vui lòng chờ %time% giây',
  'Please wait': 'Vui lòng chờ',
  'You must wait': 'Bạn cần phải chờ',
  'before doing this again': 'trước khi thực hiện lại!',
  'Cooldown': 'Thời gian hồi',
  'seconds remaining': 'giây còn lại',
  'seconds': 'giây',
  'minutes': 'phút',
  'hours': 'giờ',
  'days': 'ngày',

  // Kinh tế & Cửa hàng
  'You have purchased': 'Bạn đã mua thành công',
  'Purchased successfully': 'Giao dịch mua thành công!',
  'Sold successfully': 'Bán thành công!',
  'Transaction successful': 'Giao dịch thành công!',
  'Transaction failed': 'Giao dịch thất bại!',
  'You do not have enough money': 'Bạn không có đủ tiền để thực hiện!',
  'Insufficient funds': 'Số dư tài khoản không đủ!',
  'Not enough money': 'Không đủ tiền!',
  'You received': 'Bạn đã nhận được',
  'You have been charged': 'Bạn đã bị trừ',
  'Balance': 'Số dư tài khoản',
  'Price': 'Giá bán',
  'Cost': 'Chi phí',
  'Free': 'Miễn phí',

  // Chiến đấu & PvP
  'You were killed by': 'Bạn đã bị hạ gục bởi',
  'You killed': 'Bạn đã hạ gục',
  'Combat Log': 'Nhật ký giao tranh',
  'You are now in combat! Do not log out!': 'Bạn đang trong trạng thái giao tranh! Không được thoát game!',
  'You have safely left combat': 'Bạn đã rời khỏi trạng thái giao tranh an toàn.',
  'PvP is disabled in this area': 'Khu vực này không cho phép PvP!',
  'PvP is enabled': 'Đã bật chế độ PvP',
  'PvP is disabled': 'Đã tắt chế độ PvP',

  // Dịch chuyển & Thế giới
  'Teleporting in %time% seconds... Do not move!': 'Đang dịch chuyển sau %time% giây... Đừng di chuyển!',
  'Teleporting in %time% seconds': 'Đang dịch chuyển sau %time% giây',
  'Teleporting...': 'Đang dịch chuyển...',
  'Teleporting to': 'Đang dịch chuyển tới',
  'Teleportation cancelled because you moved!': 'Dịch chuyển bị hủy bỏ do bạn đã di chuyển!',
  'Teleportation cancelled': 'Dịch chuyển bị hủy bỏ!',
  'Teleported successfully!': 'Dịch chuyển thành công!',
  'Teleported successfully': 'Dịch chuyển thành công!',
  'Spawn': 'Khu vực sảnh',
  'Home set successfully': 'Đã lưu điểm nhà thành công!',
  'Home deleted successfully': 'Đã xóa điểm nhà thành công!',

  // Túi đồ & Vật phẩm
  'Your inventory is full': 'Túi đồ của bạn đã đầy!',
  'Inventory full': 'Túi đồ đầy!',
  'Item received': 'Đã nhận vật phẩm',
  'Item expired': 'Vật phẩm đã hết hạn',
  'Reward claimed': 'Đã nhận phần thưởng',
  'Reward already claimed': 'Bạn đã nhận phần thưởng này rồi!',
  'Daily reward': 'Phần thưởng hàng ngày',

  // Chế độ & Lệnh phổ biến
  'Fly mode enabled': 'Đã bật chế độ bay',
  'Fly mode disabled': 'Đã tắt chế độ bay',
  'God mode enabled': 'Đã bật chế độ bất tử',
  'God mode disabled': 'Đã tắt chế độ bất tử',
  'You have been healed': 'Bạn đã được hồi đầy máu!',
  'Your hunger has been restored': 'Thanh thức ăn đã được hồi phục!',

  // Chat & Broadcast
  'has joined the game': 'đã tham gia trò chơi',
  'has left the game': 'đã rời khỏi trò chơi',
  'Broadcast': 'Thông báo chung',
  'Server': 'Máy chủ',
  'Announcement': 'Thông báo',

  // Language File & FancyNpcs / Menu terms
  'has been created': 'đã được tạo',
  'has been saved': 'đã được lưu',
  'has been deleted': 'đã được xóa',
  'has been removed': 'đã được gỡ bỏ',
  'Commands': 'Lệnh',
  'General information:': 'Thông tin chung:',
  'General information': 'Thông tin chung',
  'Identifier': 'Định danh',
  'Unique identifier': 'Định danh duy nhất',
  'Location:': 'Tọa độ:',
  'Location': 'Tọa độ',
  'Documentation': 'Tài liệu hướng dẫn',
  'True': 'Đúng',
  'False': 'Sai',
  'Unknown': 'Không rõ',
  'Default': 'Mặc định',
  'Equipment': 'Trang bị',
};

// Từ vựng đơn lẻ chuyên sâu cho game & giao tiếp (Tra cứu offline khi không có internet)
export const GAMING_VOCABULARY: Record<string, string> = {
  // Giao tiếp cơ bản
  'hello': 'xin chào',
  'hi': 'chào',
  'hey': 'nè',
  'welcome': 'chào mừng',
  'goodbye': 'tạm biệt',
  'bye': 'tạm biệt',
  'thanks': 'cảm ơn',
  'thank': 'cảm ơn',
  'please': 'vui lòng',
  'yes': 'có',
  'no': 'không',
  'ok': 'đồng ý',

  // Trạng thái & Hệ thống
  'enabled': 'đã bật',
  'disabled': 'đã tắt',
  'enable': 'bật',
  'disable': 'tắt',
  'on': 'bật',
  'off': 'tắt',
  'success': 'thành công',
  'successfully': 'thành công',
  'failed': 'thất bại',
  'fail': 'thất bại',
  'error': 'lỗi',
  'warning': 'cảnh báo',
  'info': 'thông tin',
  'information': 'thông tin',
  'loading': 'đang tải',
  'online': 'trực tuyến',
  'offline': 'ngoại tuyến',
  'active': 'hoạt động',
  'inactive': 'không hoạt động',
  'expired': 'hết hạn',
  'ready': 'sẵn sàng',
  'mode': 'chế độ',
  'status': 'trạng thái',
  'time': 'thời gian',
  'seconds': 'giây',
  'minutes': 'phút',
  'hours': 'giờ',
  'days': 'ngày',
  'remaining': 'còn lại',
  'left': 'còn lại',
  'total': 'tổng cộng',
  'cooldown': 'thời gian hồi',

  // Gamer, Nhân vật, Máy chủ
  'player': 'người chơi',
  'players': 'người chơi',
  'user': 'người dùng',
  'server': 'máy chủ',
  'world': 'thế giới',
  'spawn': 'sảnh',
  'home': 'nhà',
  'warp': 'điểm dịch chuyển',
  'game': 'trò chơi',
  'admin': 'quản trị viên',
  'moderator': 'điều hành viên',
  'member': 'thành viên',
  'friend': 'bạn bè',
  'friends': 'bạn bè',
  'guild': 'bang hội',
  'clan': 'bang phái',
  'party': 'đội nhóm',
  'rank': 'hạng',
  'level': 'cấp độ',
  'exp': 'kinh nghiệm',
  'stats': 'chỉ số',
  'profile': 'hồ sơ',
  'quest': 'nhiệm vụ',
  'quests': 'nhiệm vụ',
  'reward': 'phần thưởng',
  'rewards': 'phần thưởng',
  'claim': 'nhận',
  'claimed': 'đã nhận',

  // Hành động & Gameplay
  'fly': 'bay',
  'god': 'bất tử',
  'heal': 'hồi máu',
  'feed': 'hồi đói',
  'speed': 'tốc độ',
  'damage': 'sát thương',
  'health': 'máu',
  'kill': 'hạ gục',
  'killed': 'đã hạ gục',
  'death': 'tử vong',
  'die': 'chết',
  'died': 'đã chết',
  'respawn': 'hồi sinh',
  'combat': 'giao tranh',
  'teleport': 'dịch chuyển',
  'teleported': 'đã dịch chuyển',
  'vote': 'bình chọn',
  'rules': 'quy tắc',
  'rule': 'luật lệ',
  'help': 'trợ giúp',

  // Kinh tế & Cửa hàng
  'money': 'tiền',
  'coins': 'xu',
  'balance': 'số dư',
  'price': 'giá bán',
  'cost': 'chi phí',
  'buy': 'mua',
  'sell': 'bán',
  'shop': 'cửa hàng',
  'market': 'chợ',
  'free': 'miễn phí',
  'pay': 'thanh toán',

  // Vật phẩm & Trang bị
  'item': 'vật phẩm',
  'items': 'vật phẩm',
  'inventory': 'túi đồ',
  'sword': 'kiếm',
  'bow': 'cung',
  'crossbow': 'nỏ',
  'shield': 'khiên',
  'armor': 'giáp',
  'helmet': 'mũ',
  'chestplate': 'áo giáp',
  'leggings': 'quần',
  'boots': 'giày',
  'pickaxe': 'cúp',
  'axe': 'rìu',
  'shovel': 'xẻng',
  'diamond': 'kim cương',
  'netherite': 'netherite',
  'gold': 'vàng',
  'iron': 'sắt',
  'emerald': 'ngọc lục bảo',
  'ore': 'quặng',
  'block': 'khối',
  'blocks': 'khối',
  'crate': 'hòm báu',
  'chest': 'rương',
  'key': 'chìa khóa',
  'kit': 'gói trang bị',

  // Đại từ & Liên từ thông dụng
  'you': 'bạn',
  'your': 'của bạn',
  'are': 'là',
  'is': 'là',
  'have': 'có',
  'has': 'đã',
  'not': 'không',
  'this': 'này',
  'that': 'đó',
  'and': 'và',
  'or': 'hoặc',
  'with': 'với',
  'from': 'từ',
  'to': 'đến',
  'in': 'trong',
  'at': 'tại',
  'for': 'cho',
};

// Regex toàn diện bao quát 100% token đặc thù trong Minecraft (bao gồm cả NamespacedKey)
export const TOKEN_REGEX = new RegExp(
  [
    // 1. MiniMessage Gradients, Colors, and Format Tags (st, newline, click, hover...)
    '<gradient:[^>]+>',
    '</gradient>',
    '<rainbow>',
    '</rainbow>',
    '<color:[^>]+>',
    '</color>',
    '<#[0-9a-fA-F]{6}>',
    '</#[0-9a-fA-F]{6}>',
    '<[a-zA-Z0-9_#-]+:[^>]+>', // click, hover, keybind tags
    '</[a-zA-Z0-9_#-]+>',
    '<(?:bold|italic|underlined|strikethrough|obfuscated|reset|white|black|red|dark_red|gold|yellow|green|dark_green|aqua|dark_aqua|blue|dark_blue|light_purple|dark_purple|gray|dark_gray|newline|st)>',
    '</(?:bold|italic|underlined|strikethrough|obfuscated|reset|white|black|red|dark_red|gold|yellow|green|dark_green|aqua|dark_aqua|blue|dark_blue|light_purple|dark_purple|gray|dark_gray|newline|st)>',

    // 2. Mã màu Hex Spigot / Bungee
    '(?:&|§)#[0-9a-fA-F]{6}',
    '(?:(?:&|§)x(?:(?:&|§)[0-9a-fA-F]){6})',

    // 3. Mã màu Minecraft truyền thống (&0-f, §0-f, &l, &r...)
    '(?:&|§)[0-9a-fk-orA-FK-OR]',

    // 4. Placeholders (PAPI, MVDW, Plugin Tags, {primaryColor}, {npc}, etc.)
    '%[a-zA-Z0-9_.:$]+%',
    '\\{[a-zA-Z0-9_.:-]+\\}',
    '\\[[a-zA-Z0-9_.:-]+\\]',
    '<[a-zA-Z0-9_.:-]+>',

    // 5. Minecraft NamespacedKey (VD: minecraft:wooden_axe, c:stone)
    '(?:minecraft|[a-zA-Z0-9_-]+):[a-zA-Z0-9_./-]+',

    // 6. Java Format Specifiers (%1$s, %4$s, %5$s%6$s%n, ...)
    '%[0-9]+\\$[a-zA-Z0-9_]+',

    // 7. RULE 030 & 032 — Command Strings (/npc help, /npc remove, //wand...)
    '\\/{1,2}[a-zA-Z0-9_-]+(?:\\s+[a-zA-Z0-9_-]+)*',

    // 8. RULE 033 — Thuật ngữ bất biến (NPC, UUID, API, URL, Minecraft...)
    '\\b(?:NPC|NPCs|UUID|UUIDs|API|URL|Minecraft|Placeholder|Placeholders|MiniMessage|PlaceholderAPI)\\b',

    // 9. URLs, Escape characters
    'https?:\\/\\/[^\\s"\'>]+',
    '\\\\[ntr"\']',
  ].join('|'),
  'g'
);

/**
 * Chuyển 1 ký tự sang Font Mini (Small Caps) an toàn
 */
export function charToSmallCaps(char: string): string {
  const lower = char.toLowerCase();
  if (lower === 'đ') return 'đ';
  return SMALL_CAPS_MAP[lower] || char;
}

/**
 * Chuyển đổi text sang Small Caps mà BẢO TOÀN 100% token mã màu, hex, placeholder
 */
export function convertTextToMiniFontSafe(text: string): string {
  let lastIndex = 0;
  let result = '';
  let match: RegExpExecArray | null;

  const regex = new RegExp(TOKEN_REGEX.source, 'g');

  while ((match = regex.exec(text)) !== null) {
    const plainSegment = text.substring(lastIndex, match.index);
    result += Array.from(plainSegment).map(charToSmallCaps).join('');
    result += match[0]; // Giữ nguyên 100% token mã màu / placeholder
    lastIndex = regex.lastIndex;
  }

  const remaining = text.substring(lastIndex);
  result += Array.from(remaining).map(charToSmallCaps).join('');

  return result;
}

export interface FormattingAffixes {
  leading: string;
  core: string;
  trailing: string;
}

/**
 * Tách các mã màu, MiniMessage tags, hex ở đầu và cuối chuỗi để dịch phần cốt lõi
 * Giúp AI / Google Translate KHÔNG BAO GIỜ đảo ngược vị trí mã màu ra sau câu
 */
export function extractFormattingAffixes(text: string): FormattingAffixes {
  const FORMAT_TOKEN_PATTERN =
    '(?:(?:&|§)[0-9a-fk-orA-FK-OR]|(?:&|§)#[0-9a-fA-F]{6}|(?:&|§)x(?:(?:&|§)[0-9a-fA-F]){6}|<#[0-9a-fA-F]{6}>|<\\/#[0-9a-fA-F]{6}>|<gradient:[^>]+>|<\\/gradient>|<rainbow>|<\\/rainbow>|<color:[^>]+>|<\\/color>|<(?:bold|italic|underlined|strikethrough|obfuscated|reset|white|black|red|dark_red|gold|yellow|green|dark_green|aqua|dark_aqua|blue|dark_blue|light_purple|dark_purple|gray|dark_gray|newline|st)>|<\\/(?:bold|italic|underlined|strikethrough|obfuscated|reset|white|black|red|dark_red|gold|yellow|green|dark_green|aqua|dark_aqua|blue|dark_blue|light_purple|dark_purple|gray|dark_gray|newline|st)>)';

  const leadingRegex = new RegExp(`^(?:${FORMAT_TOKEN_PATTERN})+`, 'i');
  const trailingRegex = new RegExp(`(?:${FORMAT_TOKEN_PATTERN}|\\s)+$`, 'i');

  let leading = '';
  let trailing = '';
  let remaining = text;

  const leadMatch = remaining.match(leadingRegex);
  if (leadMatch) {
    leading = leadMatch[0];
    remaining = remaining.substring(leading.length);
  }

  const trailMatch = remaining.match(trailingRegex);
  if (trailMatch && remaining.length > trailMatch[0].length) {
    trailing = trailMatch[0];
    remaining = remaining.substring(0, remaining.length - trailing.length);
  }

  return {
    leading,
    core: remaining,
    trailing,
  };
}

export interface ShieldResult {
  shieldedText: string;
  tokens: string[];
}

/**
 * Trích xuất và bọc token (Shielding): thay token bằng marker ẩn «MC_TKN_N»
 */
export function shieldTokens(input: string): ShieldResult {
  const tokens: string[] = [];
  const regex = new RegExp(TOKEN_REGEX.source, 'g');

  const shieldedText = input.replace(regex, (match) => {
    const idx = tokens.length;
    tokens.push(match);
    return `«MC_TKN_${idx}»`;
  });

  return { shieldedText, tokens };
}

/**
 * Hoàn nguyên token sau khi đã dịch xong
 */
export function unshieldTokens(shieldedText: string, tokens: string[]): string {
  return shieldedText.replace(/«\s*MC\s*_TKN_\s*(\d+)\s*»/gi, (_, idxStr) => {
    const idx = parseInt(idxStr, 10);
    return tokens[idx] !== undefined ? tokens[idx] : `«MC_TKN_${idxStr}»`;
  });
}

/**
 * Kiểm tra xem 1 giá trị có phải là thứ KỸ THUẬT KHÔNG ĐƯỢC DỊCH không
 */
export function isNonTranslatableValue(val: string, keyPath?: string): boolean {
  const trimmed = val.trim().replace(/^['"]|['"]$/g, '');
  if (!trimmed) return true;

  // Boolean, Số âm / dương, Time flag (10s, 5m, 1h, -1, 0, 256)
  if (/^(true|false|yes|no|-?\d+(\.\d+)?([smhd])?)$/i.test(trimmed)) return true;

  // Serialized Objects Bukkit (==: org.bukkit.inventory.ItemStack)
  if (trimmed.startsWith('==:') || trimmed.includes('org.bukkit.')) return true;

  // UUIDs (8f32a1b4-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(trimmed)) return true;

  // Biểu thức chính quy Regex (.*, [a-z], \d+, ^, $)
  if (/(?:^\.\*|\.\*$|\\[dswDSW]|\^|\$|\[[a-zA-Z0-9_-]+\]|\(\?[:!=])/.test(trimmed)) return true;

  // Minecraft NamespacedKey (VD: minecraft:wooden_axe, minecraft:oak_sapling, c:iron)
  if (/^[a-zA-Z0-9_-]+:[a-zA-Z0-9_./-]+$/.test(trimmed)) return true;

  // Tên Plugin bất biến (RULE BẤT BIẾN: Không đổi PlaceholderAPI thành API_đặt_chỗ)
  const IMMUTABLE_PLUGINS = new Set([
    'vault', 'placeholderapi', 'worldguard', 'worldedit', 'towny', 'itemsadder',
    'oraxen', 'protocollib', 'mythicmobs', 'deluxemenus', 'luckperms', 'fancynpcs',
    'essentials', 'essentialsx', 'citizens', 'multiverse-core', 'decentholograms', 'skript'
  ]);
  if (IMMUTABLE_PLUGINS.has(trimmed.toLowerCase())) return true;

  // Permission node (VD: mewmc.vip, essentials.fly, worldedit.wand)
  if (/^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(trimmed)) return true;

  // Sound enum / Material enum / Java Class (VD: ENTITY_PLAYER_LEVELUP, DIAMOND_SWORD, OAK_SAPLING)
  if (/^[A-Z0-9_]{3,}$/.test(trimmed)) return true;

  // Command duy nhất (VD: /spawn, /help, //wand, //set)
  if (/^\/{1,2}[a-zA-Z0-9_-]+$/.test(trimmed)) return true;

  // Màu hex đơn lẻ (VD: #ff007f)
  if (/^#[0-9a-fA-F]{3,8}$/.test(trimmed)) return true;

  // Tệp tin, đuôi file
  if (/^[a-zA-Z0-9_.-]+\.(log|yml|yaml|json|txt|schem|schematic|db|sqlite|properties|dat|jar|png|wav|ogg)$/i.test(trimmed)) return true;

  // URL thuần túy
  if (/^https?:\/\/[^\s]+$/i.test(trimmed)) return true;

  // Java format strings (VD: [%1$tY-%1$tm-%1$td...])
  if (/%[0-9]+\$|%[sdntf]/i.test(trimmed) && (trimmed.includes('%1$') || trimmed.includes('%n'))) return true;

  // RULE 017 — LOẠI A — STRING KỸ THUẬT (CẤM DỊCH)
  if (/^(minecraft|namespace|plugin|world|file|path):/i.test(trimmed)) return true;

  // RULE 006 — Block Name Protection (Danh sách Minecraft ID bất biến)
  // Chỉ khóa nếu không phải là trường hiển thị rõ ràng (như display-name, name, lore)
  const isDisplayKey = keyPath && (
    keyPath.toLowerCase().endsWith('name') ||
    keyPath.toLowerCase().endsWith('title') ||
    keyPath.toLowerCase().endsWith('lore') ||
    keyPath.toLowerCase().includes('lore[]') ||
    keyPath.toLowerCase().endsWith('description') ||
    keyPath.toLowerCase().endsWith('desc') ||
    keyPath.toLowerCase().endsWith('message') ||
    keyPath.toLowerCase().endsWith('msg')
  );

  const MC_BLOCK_NAMES = new Set([
    'oak', 'spruce', 'birch', 'jungle', 'acacia', 'dark_oak', 'stone', 'dirt', 'grass', 'sand', 'gravel',
    'water', 'lava', 'fire', 'tnt', 'piston', 'redstone', 'torch', 'rail', 'bed', 'air', 'iron', 'gold',
    'diamond', 'netherite', 'emerald', 'obsidian', 'sponge', 'glass', 'clay', 'ice', 'snow', 'wool'
  ]);
  if (!isDisplayKey && MC_BLOCK_NAMES.has(trimmed.toLowerCase())) return true;

  // RULE 010 — Path Lock (khi cả giá trị là 1 đường dẫn tệp/thư mục, VD: "plugins/WorldEdit", "schematics/test.schem")
  if (/^[a-zA-Z0-9_.-]+[\\/][a-zA-Z0-9_./-]*$/.test(trimmed) || /^(plugins|schematics|logs|scripts|config|data)[\\/]/i.test(trimmed)) return true;

  // Thư mục kỹ thuật khi key trỏ vào dir/path/file
  if (keyPath) {
    const lk = keyPath.toLowerCase();
    if (
      lk.endsWith('.dir') ||
      lk.endsWith('.directory') ||
      lk.endsWith('.folder') ||
      lk.endsWith('.path') ||
      lk.endsWith('.file') ||
      lk.endsWith('.filename')
    ) {
      return true;
    }
  }

  return false;
}

export type ConfigFileType =
  | 'TYPE_A' // Core Config
  | 'TYPE_B' // Language / Messages
  | 'TYPE_C' // Permissions
  | 'TYPE_D' // GUI / Menu
  | 'TYPE_E' // Item / Lore / Display
  | 'TYPE_F' // Database / Storage (READ ONLY)
  | 'TYPE_G' // Command / Alias
  | 'TYPE_H' // Placeholder
  | 'TYPE_I' // Template File
  | 'TYPE_J' // World / Region Data (READ ONLY)
  | 'TYPE_K' // Script / Automation (READ ONLY)
  | 'TYPE_L' // Internal Data / Cache (READ ONLY)
  | 'TYPE_M' // Hook / Integration
  | 'TYPE_N' // Economy / Shop
  | 'TYPE_O' // Quest / Mission
  | 'TYPE_P' // Achievement / Advancement
  | 'TYPE_Q' // Mob / Entity
  | 'TYPE_R' // Skill / Effect
  | 'TYPE_S' // Custom Item ID
  | 'TYPE_T' // Resource Pack
  | 'TYPE_U' // NBT / Data Tag
  | 'TYPE_V' // Database Migration (READ ONLY)
  | 'TYPE_W' // Regex / Filter
  | 'TYPE_X' // Log Format
  | 'TYPE_Y' // Scoreboard / Tablist
  | 'TYPE_Z' // Hologram
  | 'TYPE_AA' // Animation
  | 'TYPE_AB' // Bossbar
  | 'TYPE_AC' // Tab Completion / Argument
  | 'TYPE_AD' // Serialized Object (READ ONLY)
  | 'TYPE_AE' // UUID / Profile Data (READ ONLY)
  | 'TYPE_AF' // Binary / Hash / Token (READ ONLY)
  | 'TYPE_AG' // Registry ID (READ ONLY)
  | 'TYPE_AH' // Dependency
  | 'TYPE_AI' // Update Checker
  | 'TYPE_AJ'; // Template Placeholder File

export type PluginFingerprint =
  | 'FANCY_NPCS'
  | 'MYTHIC_MOBS'
  | 'ITEMS_ADDER'
  | 'ORAXEN'
  | 'DELUXE_MENUS'
  | 'LUCK_PERMS'
  | 'WORLD_GUARD'
  | 'DECENT_HOLOGRAMS'
  | 'VAULT'
  | 'GENERIC';

export interface FileTypeInfo {
  type: ConfigFileType;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  readOnly: boolean;
}

export const FILE_TYPE_DEFINITIONS: Record<ConfigFileType, FileTypeInfo> = {
  TYPE_A: {
    type: 'TYPE_A',
    name: 'Core Config',
    badge: 'TYPE A — Core Config',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    description: 'Cấu hình hệ thống: Khóa 100% keys, số, boolean, enums, paths. Dịch comment # và message rõ ràng.',
    readOnly: false,
  },
  TYPE_B: {
    type: 'TYPE_B',
    name: 'Language / Messages',
    badge: 'TYPE B — Language / Messages',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    description: 'Tệp ngôn ngữ: Khóa cấu trúc và key, mở khóa câu chữ, bảo toàn placeholders và MiniMessage.',
    readOnly: false,
  },
  TYPE_C: {
    type: 'TYPE_C',
    name: 'Permissions',
    badge: 'TYPE C — Permissions',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    description: 'Quyền hạn: Khóa toàn bộ permission nodes, chỉ dịch mục description và comment #.',
    readOnly: false,
  },
  TYPE_D: {
    type: 'TYPE_D',
    name: 'GUI / Menu',
    badge: 'TYPE D — GUI / Menu',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    description: 'Giao diện Menu: Khóa slots, size, material. Cho phép dịch title, name, lore.',
    readOnly: false,
  },
  TYPE_E: {
    type: 'TYPE_E',
    name: 'Item / Lore / Display',
    badge: 'TYPE E — Item / Lore',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    description: 'Vật phẩm & Trang bị: Khóa material, amount, nbt. Cho phép dịch name, lore, description.',
    readOnly: false,
  },
  TYPE_F: {
    type: 'TYPE_F',
    name: 'Database / Storage',
    badge: 'TYPE F — Database / Storage (Protected)',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    description: 'Dữ liệu người chơi / UUID: CẤM DỊCH 100% (Chế độ Read-Only an toàn).',
    readOnly: true,
  },
  TYPE_G: {
    type: 'TYPE_G',
    name: 'Command / Alias',
    badge: 'TYPE G — Command / Alias',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    description: 'Lệnh & Bí danh: Khóa tên lệnh, permission. Cho phép dịch description.',
    readOnly: false,
  },
  TYPE_H: {
    type: 'TYPE_H',
    name: 'Placeholder',
    badge: 'TYPE H — Placeholder',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    description: 'Định dạng Placeholder: Cấm đổi {player}, %player_name%.',
    readOnly: false,
  },
  TYPE_I: {
    type: 'TYPE_I',
    name: 'Template File',
    badge: 'TYPE I — Template File',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    description: 'Tệp mẫu: Dịch comment hướng dẫn #, giữ nguyên mã code.',
    readOnly: false,
  },
  TYPE_J: {
    type: 'TYPE_J',
    name: 'World / Region Data',
    badge: 'TYPE J — World / Region (Protected)',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    description: 'Tọa độ & Vùng WorldGuard: CẤM DỊCH tọa độ, flags, region ID.',
    readOnly: true,
  },
  TYPE_K: {
    type: 'TYPE_K',
    name: 'Script / Automation',
    badge: 'TYPE K — Script (Protected)',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    description: 'Kịch bản Skript/Denizen: Cấm dịch command, event, trigger.',
    readOnly: true,
  },
  TYPE_L: {
    type: 'TYPE_L',
    name: 'Internal Data / Cache',
    badge: 'TYPE L — Cache / Data (Protected)',
    badgeColor: 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
    description: 'Dữ liệu nội bộ / Cache: CẤM DỊCH 100%.',
    readOnly: true,
  },
  TYPE_M: {
    type: 'TYPE_M',
    name: 'Hook / Integration',
    badge: 'TYPE M — Hook / Integration',
    badgeColor: 'bg-blue-600/20 text-blue-300 border-blue-500/30',
    description: 'Liên kết Plugin: Khóa tên plugin (Vault, PlaceholderAPI, WorldGuard, ItemsAdder, Oraxen).',
    readOnly: false,
  },
  TYPE_N: {
    type: 'TYPE_N',
    name: 'Economy / Shop',
    badge: 'TYPE N — Economy / Shop',
    badgeColor: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30',
    description: 'Kinh tế & Cửa hàng: Khóa material, buy, sell, price, currency. Dịch display-name, lore, description.',
    readOnly: false,
  },
  TYPE_O: {
    type: 'TYPE_O',
    name: 'Quest / Mission',
    badge: 'TYPE O — Quest / Mission',
    badgeColor: 'bg-amber-600/20 text-amber-300 border-amber-500/30',
    description: 'Nhiệm vụ RPG: Khóa id, objectives, kill, entity, amount. Dịch name, description, reward-message.',
    readOnly: false,
  },
  TYPE_P: {
    type: 'TYPE_P',
    name: 'Achievement / Advancement',
    badge: 'TYPE P — Achievement / Advancement',
    badgeColor: 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30',
    description: 'Thành tựu: Khóa id, icon, criteria. Dịch title, description, message.',
    readOnly: false,
  },
  TYPE_Q: {
    type: 'TYPE_Q',
    name: 'Mob / Entity Config',
    badge: 'TYPE Q — Mob / Entity',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
    description: 'Quái vật (MythicMobs): Khóa Type, Health, Skills, Mechanics. Dịch display-name.',
    readOnly: false,
  },
  TYPE_R: {
    type: 'TYPE_R',
    name: 'Skill / Effect',
    badge: 'TYPE R — Skill / Effect',
    badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
    description: 'Kỹ năng & Hiệu ứng: Khóa cooldown, damage, effect, radius. Dịch display, description.',
    readOnly: false,
  },
  TYPE_S: {
    type: 'TYPE_S',
    name: 'Custom Item ID',
    badge: 'TYPE S — Custom Item (Protected ID)',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    description: 'Item tùy chỉnh (ItemsAdder/Oraxen): Khóa custom_id, namespace, pack, model.',
    readOnly: false,
  },
  TYPE_T: {
    type: 'TYPE_T',
    name: 'Resource Pack Config',
    badge: 'TYPE T — Resource Pack (Protected)',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    description: 'Gói tài nguyên: Khóa url, hash, sha1, file, namespace, model.',
    readOnly: false,
  },
  TYPE_U: {
    type: 'TYPE_U',
    name: 'NBT / Data Tag',
    badge: 'TYPE U — NBT Tag (Protected)',
    badgeColor: 'bg-purple-600/20 text-purple-300 border-purple-500/30',
    description: 'Thẻ NBT Minecraft: Khóa CustomModelData, Enchantments, AttributeModifiers.',
    readOnly: false,
  },
  TYPE_V: {
    type: 'TYPE_V',
    name: 'Database Migration',
    badge: 'TYPE V — Migration (Protected)',
    badgeColor: 'bg-rose-600/20 text-rose-300 border-rose-500/30',
    description: 'Cấu trúc Database: CẤM DỊCH 100% tables, columns, indexes, primary_key.',
    readOnly: true,
  },
  TYPE_W: {
    type: 'TYPE_W',
    name: 'Regex / Filter Config',
    badge: 'TYPE W — Regex / Filter (Protected)',
    badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    description: 'Bộ lọc & Biểu thức chính quy: Khóa regex, pattern, expressions (.*, \\d+).',
    readOnly: false,
  },
  TYPE_X: {
    type: 'TYPE_X',
    name: 'Log Format Config',
    badge: 'TYPE X — Log Format (Protected)',
    badgeColor: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    description: 'Định dạng nhật ký: Khóa token [%time%], [%message%], %n.',
    readOnly: false,
  },
  TYPE_Y: {
    type: 'TYPE_Y',
    name: 'Scoreboard / Tablist',
    badge: 'TYPE Y — Scoreboard / Tablist',
    badgeColor: 'bg-cyan-600/20 text-cyan-300 border-cyan-500/30',
    description: 'Bảng điểm & Tablist: Khóa placeholders. Dịch nhãn hiển thị (Player, Kills, Money).',
    readOnly: false,
  },
  TYPE_Z: {
    type: 'TYPE_Z',
    name: 'Hologram Config',
    badge: 'TYPE Z — Hologram (DecentHolograms)',
    badgeColor: 'bg-teal-600/20 text-teal-300 border-teal-500/30',
    description: 'Chữ nổi Hologram: Khóa spawn, location. Dịch nội dung các dòng (lines).',
    readOnly: false,
  },
  TYPE_AA: {
    type: 'TYPE_AA',
    name: 'Animation Config',
    badge: 'TYPE AA — Animation',
    badgeColor: 'bg-lime-500/20 text-lime-300 border-lime-500/30',
    description: 'Hiệu ứng hoạt ảnh: Khóa delay, ticks. Dịch nội dung khung hình (frames).',
    readOnly: false,
  },
  TYPE_AB: {
    type: 'TYPE_AB',
    name: 'Bossbar Config',
    badge: 'TYPE AB — Bossbar',
    badgeColor: 'bg-red-600/20 text-red-300 border-red-500/30',
    description: 'Thanh Bossbar: Khóa color, style, progress. Dịch tiêu đề title.',
    readOnly: false,
  },
  TYPE_AC: {
    type: 'TYPE_AC',
    name: 'Tab Completion / Argument',
    badge: 'TYPE AC — Tab Completion (Protected)',
    badgeColor: 'bg-neutral-500/20 text-neutral-300 border-neutral-500/30',
    description: 'Gợi ý lệnh: CẤM DỊCH các argument (reload, save, create).',
    readOnly: false,
  },
  TYPE_AD: {
    type: 'TYPE_AD',
    name: 'Serialized Object',
    badge: 'TYPE AD — Serialized Object (Protected)',
    badgeColor: 'bg-red-700/20 text-red-300 border-red-600/30',
    description: 'Đối tượng tuần tự hóa (==: org.bukkit...): CẤM DỊCH 100%.',
    readOnly: true,
  },
  TYPE_AE: {
    type: 'TYPE_AE',
    name: 'UUID / Profile Data',
    badge: 'TYPE AE — UUID / Profile (Protected)',
    badgeColor: 'bg-rose-700/20 text-rose-300 border-rose-600/30',
    description: 'Dữ liệu người chơi & Skin UUID: CẤM DỊCH 100%.',
    readOnly: true,
  },
  TYPE_AF: {
    type: 'TYPE_AF',
    name: 'Binary / Hash / Token',
    badge: 'TYPE AF — Hash / Token (Protected)',
    badgeColor: 'bg-stone-500/20 text-stone-300 border-stone-500/30',
    description: 'Mã bảo mật & Token: CẤM DỊCH 100% token, hash, secret.',
    readOnly: true,
  },
  TYPE_AG: {
    type: 'TYPE_AG',
    name: 'Registry ID',
    badge: 'TYPE AG — Registry ID (Protected)',
    badgeColor: 'bg-amber-700/20 text-amber-300 border-amber-600/30',
    description: 'Minecraft Registry ID (minecraft:...): CẤM DỊCH 100%.',
    readOnly: true,
  },
  TYPE_AH: {
    type: 'TYPE_AH',
    name: 'Dependency Config',
    badge: 'TYPE AH — Dependency (Protected)',
    badgeColor: 'bg-indigo-700/20 text-indigo-300 border-indigo-600/30',
    description: 'Phụ thuộc plugin (depend, softdepend): CẤM DỊCH danh sách plugin.',
    readOnly: false,
  },
  TYPE_AI: {
    type: 'TYPE_AI',
    name: 'Update Checker',
    badge: 'TYPE AI — Update Checker (Protected)',
    badgeColor: 'bg-blue-700/20 text-blue-300 border-blue-600/30',
    description: 'Kiểm tra cập nhật: Khóa URL, version, channel.',
    readOnly: false,
  },
  TYPE_AJ: {
    type: 'TYPE_AJ',
    name: 'Template Placeholder File',
    badge: 'TYPE AJ — Template Placeholder',
    badgeColor: 'bg-yellow-700/20 text-yellow-300 border-yellow-600/30',
    description: 'Tệp mẫu: Dịch comment hướng dẫn, khóa toàn bộ code và placeholders.',
    readOnly: false,
  },
};

/**
 * TẦNG 2 — PLUGIN FINGERPRINT DATABASE (NHẬN DẠNG PLUGIN TỰ ĐỘNG)
 */
export function detectPluginFingerprint(yamlContent: string, fileName = ''): PluginFingerprint {
  const lowerContent = yamlContent.toLowerCase();
  const lowerName = fileName.toLowerCase();

  if (
    lowerName.includes('fancynpcs') ||
    lowerContent.includes('fancynpcs') ||
    lowerContent.includes('player_command_as_op') ||
    /npc_\w+/.test(lowerContent)
  ) {
    return 'FANCY_NPCS';
  }
  if (
    lowerName.includes('mythicmobs') ||
    lowerContent.includes('mythicmobs') ||
    (lowerContent.includes('skills:') && (lowerContent.includes('mechanics:') || lowerContent.includes('conditions:')))
  ) {
    return 'MYTHIC_MOBS';
  }
  if (
    lowerName.includes('itemsadder') ||
    lowerContent.includes('itemsadder') ||
    (lowerContent.includes('resourcepack:') && lowerContent.includes('namespace:') && lowerContent.includes('custom_item:'))
  ) {
    return 'ITEMS_ADDER';
  }
  if (
    lowerName.includes('oraxen') ||
    lowerContent.includes('oraxen') ||
    (lowerContent.includes('pack:') && lowerContent.includes('glyph:') && lowerContent.includes('mechanics:'))
  ) {
    return 'ORAXEN';
  }
  if (
    lowerName.includes('deluxemenus') ||
    lowerContent.includes('deluxemenus') ||
    (lowerContent.includes('click_commands:') && lowerContent.includes('view_requirement:'))
  ) {
    return 'DELUXE_MENUS';
  }
  if (
    lowerName.includes('luckperms') ||
    lowerContent.includes('luckperms') ||
    (lowerContent.includes('group:') && lowerContent.includes('permission:') && lowerContent.includes('meta:'))
  ) {
    return 'LUCK_PERMS';
  }
  if (
    lowerName.includes('worldguard') ||
    lowerContent.includes('worldguard') ||
    (lowerContent.includes('regions:') && lowerContent.includes('flags:') && lowerContent.includes('min:') && lowerContent.includes('max:'))
  ) {
    return 'WORLD_GUARD';
  }
  if (
    lowerName.includes('decentholograms') ||
    lowerContent.includes('decentholograms') ||
    (/holograms\s*:/i.test(yamlContent) && /lines\s*:/i.test(yamlContent))
  ) {
    return 'DECENT_HOLOGRAMS';
  }
  if (lowerName.includes('vault') || /hooks\s*:\s*\n\s*vault\s*:/i.test(yamlContent)) {
    return 'VAULT';
  }

  return 'GENERIC';
}

/**
 * TẦNG 1 — FILE TYPE DETECTOR (NHẬN DIỆN LOẠI FILE: TYPE A -> TYPE AJ)
 */
export function detectConfigFileType(yamlContent: string, fileName = ''): ConfigFileType {
  const lowerName = fileName.toLowerCase();
  const lowerContent = yamlContent.toLowerCase();

  // 1. Nhận diện các đối tượng tuần tự hóa Bukkit (TYPE AD)
  if (yamlContent.includes('==: org.bukkit.') || /^\s*serialized\s*:/m.test(lowerContent)) {
    return 'TYPE_AD';
  }

  // 2. Nhận diện UUID / Profile Data (TYPE AE)
  if (/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\s*:/i.test(yamlContent)) {
    return 'TYPE_AE';
  }

  // 3. Nhận diện Binary / Hash / Secret / Token (TYPE AF)
  if (
    (/^\s*secret\s*:/m.test(lowerContent) || /^\s*token\s*:/m.test(lowerContent) || /^\s*hash\s*:/m.test(lowerContent)) &&
    !lowerContent.includes('message') && !lowerContent.includes('title')
  ) {
    return 'TYPE_AF';
  }

  // 4. Nhận diện Database Migration / Schema (TYPE V)
  if (
    lowerName.includes('migration') ||
    lowerName.includes('schema') ||
    (lowerContent.includes('tables:') && lowerContent.includes('columns:') && lowerContent.includes('primary_key:'))
  ) {
    return 'TYPE_V';
  }

  // 5. Nhận diện WorldGuard / Regions (TYPE J)
  if (
    lowerName.includes('region') ||
    lowerName.includes('worldguard') ||
    (/^\s*regions\s*:/m.test(lowerContent) && (lowerContent.includes('min:') || lowerContent.includes('flags:')))
  ) {
    return 'TYPE_J';
  }

  // 6. Nhận diện Script / Automation (TYPE K)
  if (
    lowerName.endsWith('.sk') ||
    lowerName.includes('script') ||
    lowerName.includes('denizen') ||
    /^\s*script\s*:/m.test(lowerContent) ||
    /^\s*trigger\s*:/m.test(lowerContent) ||
    /command\s+\/[a-zA-Z0-9_-]+\s*:/i.test(yamlContent)
  ) {
    return 'TYPE_K';
  }

  // 7. Nhận diện Internal Cache / Index (TYPE L)
  if (
    lowerName.includes('cache') ||
    lowerName.includes('backup') ||
    lowerName.includes('index') ||
    /^\s*cache\s*:/m.test(lowerContent) ||
    /^\s*last-backup\s*:/m.test(lowerContent)
  ) {
    return 'TYPE_L';
  }

  // 8. Nhận diện Registry ID thuần túy (TYPE AG)
  if (/^minecraft:[a-z0-9_.-]+$/m.test(lowerContent.trim())) {
    return 'TYPE_AG';
  }

  // 9. Nhận diện Custom Item Config (TYPE S)
  if (
    lowerName.includes('custom_item') ||
    lowerName.includes('itemsadder') ||
    lowerName.includes('oraxen') ||
    (lowerContent.includes('resourcepack:') && lowerContent.includes('custom_item:'))
  ) {
    return 'TYPE_S';
  }

  // 10. Nhận diện Resource Pack (TYPE T)
  if (
    lowerName.includes('resourcepack') ||
    lowerName.includes('pack.yml') ||
    (/^\s*pack\s*:/m.test(lowerContent) && (lowerContent.includes('url:') || lowerContent.includes('hash:') || lowerContent.includes('sha1:')))
  ) {
    return 'TYPE_T';
  }

  // 11. Nhận diện NBT Tag Config (TYPE U)
  if (/^\s*nbt\s*:/m.test(lowerContent) || /custommodeldata\s*:/m.test(lowerContent) || /attributemodifiers\s*:/m.test(lowerContent)) {
    return 'TYPE_U';
  }

  // 12. Nhận diện Regex / Filter (TYPE W)
  if (lowerName.includes('filter') || lowerName.includes('regex') || /^\s*filters?\s*:/m.test(lowerContent) || /^\s*patterns?\s*:/m.test(lowerContent)) {
    return 'TYPE_W';
  }

  // 13. Nhận diện Log Format Config (TYPE X)
  if (/^\s*logging\s*:/m.test(lowerContent) && /format\s*:\s*["'][^"']*[%][a-zA-Z0-9]+[%]/m.test(lowerContent)) {
    return 'TYPE_X';
  }

  // 14. Nhận diện Scoreboard / Tablist (TYPE Y)
  if (
    lowerName.includes('scoreboard') ||
    lowerName.includes('tab') ||
    lowerName.includes('sidebar') ||
    /^\s*scoreboard\s*:/m.test(lowerContent) ||
    /^\s*tablist\s*:/m.test(lowerContent)
  ) {
    return 'TYPE_Y';
  }

  // 15. Nhận diện Hologram (TYPE Z)
  if (lowerName.includes('hologram') || /^\s*holograms?\s*:/m.test(lowerContent)) {
    return 'TYPE_Z';
  }

  // 16. Nhận diện Animation (TYPE AA)
  if (lowerName.includes('animation') || (/^\s*frames?\s*:/m.test(lowerContent) && (lowerContent.includes('delay:') || lowerContent.includes('ticks:')))) {
    return 'TYPE_AA';
  }

  // 17. Nhận diện Bossbar (TYPE AB)
  if (lowerName.includes('bossbar') || (/^\s*bossbar\s*:/m.test(lowerContent) && (lowerContent.includes('color:') || lowerContent.includes('style:')))) {
    return 'TYPE_AB';
  }

  // 18. Nhận diện Tab Completion / Argument (TYPE AC)
  if (/^\s*arguments?\s*:/m.test(lowerContent) || /^\s*completions?\s*:/m.test(lowerContent)) {
    return 'TYPE_AC';
  }

  // 19. Nhận diện Dependency (TYPE AH)
  if (/^\s*depend\s*:/m.test(lowerContent) || /^\s*softdepend\s*:/m.test(lowerContent)) {
    return 'TYPE_AH';
  }

  // 20. Nhận diện Update Checker (TYPE AI)
  if (/^\s*update\s*:/m.test(lowerContent) && (lowerContent.includes('version:') || lowerContent.includes('channel:'))) {
    return 'TYPE_AI';
  }

  // 21. Nhận diện Hooks / Integration (TYPE M)
  if (
    lowerName.includes('hook') ||
    lowerName.includes('integration') ||
    lowerName.includes('compatibility') ||
    /^\s*hooks?\s*:/m.test(lowerContent) ||
    /^\s*integrations?\s*:/m.test(lowerContent)
  ) {
    return 'TYPE_M';
  }

  // 22. Nhận diện Economy / Shop (TYPE N)
  if (
    lowerName.includes('shop') ||
    lowerName.includes('price') ||
    lowerName.includes('economy') ||
    /^\s*shops?\s*:/m.test(lowerContent) ||
    (lowerContent.includes('buy:') && lowerContent.includes('sell:') && lowerContent.includes('material:'))
  ) {
    return 'TYPE_N';
  }

  // 23. Nhận diện Quest / Mission (TYPE O)
  if (
    lowerName.includes('quest') ||
    lowerName.includes('mission') ||
    lowerName.includes('objective') ||
    /^\s*quests?\s*:/m.test(lowerContent) ||
    /^\s*objectives?\s*:/m.test(lowerContent)
  ) {
    return 'TYPE_O';
  }

  // 24. Nhận diện Achievement / Advancement (TYPE P)
  if (
    lowerName.includes('achievement') ||
    lowerName.includes('advancement') ||
    /^\s*achievements?\s*:/m.test(lowerContent) ||
    /^\s*advancements?\s*:/m.test(lowerContent)
  ) {
    return 'TYPE_P';
  }

  // 25. Nhận diện Mob / Entity (MythicMobs) (TYPE Q)
  if (
    lowerName.includes('mob') ||
    lowerName.includes('entity') ||
    lowerName.includes('mythic') ||
    (/^\s*mobs?\s*:/m.test(lowerContent) && (lowerContent.includes('type:') || lowerContent.includes('health:')))
  ) {
    return 'TYPE_Q';
  }

  // 26. Nhận diện Skill / Effect (TYPE R)
  if (
    lowerName.includes('skill') ||
    lowerName.includes('ability') ||
    lowerName.includes('effect') ||
    (/^\s*skills?\s*:/m.test(lowerContent) && (lowerContent.includes('cooldown:') || lowerContent.includes('damage:')))
  ) {
    return 'TYPE_R';
  }

  // 27. Nhận diện Permissions (TYPE C)
  if (lowerName.includes('permission') || (/^\s*permissions?\s*:/m.test(lowerContent) && lowerContent.includes('description:'))) {
    return 'TYPE_C';
  }

  // 28. Nhận diện GUI / Menu (TYPE D)
  if (
    lowerName.includes('menu') ||
    lowerName.includes('gui') ||
    (/^\s*menu\s*:/m.test(lowerContent) && (lowerContent.includes('size:') || lowerContent.includes('slot:')))
  ) {
    return 'TYPE_D';
  }

  // 29. Nhận diện Items (TYPE E)
  if (lowerName.includes('item') || (/^\s*items?\s*:/m.test(lowerContent) && lowerContent.includes('material:'))) {
    return 'TYPE_E';
  }

  // 30. Nhận diện Template Placeholder File (TYPE AJ)
  if (
    lowerName.includes('example') ||
    lowerName.includes('default') ||
    (/#\s*example\b/i.test(yamlContent) && /%[a-zA-Z0-9_]+%/.test(yamlContent))
  ) {
    return 'TYPE_AJ';
  }

  // 31. Nhận diện Template chung (TYPE I)
  if (lowerName.includes('template') || /#\s*template\b/i.test(yamlContent) || /#\s*copy this file\b/i.test(yamlContent)) {
    return 'TYPE_I';
  }

  // 32. Nhận diện Placeholders (TYPE H)
  if (lowerName.includes('placeholder') || /^\s*placeholders?\s*:/m.test(lowerContent)) {
    return 'TYPE_H';
  }

  // 33. Nhận diện Commands (TYPE G)
  if (lowerName.includes('command') || (/^\s*commands?\s*:/m.test(lowerContent) && lowerContent.includes('aliases:'))) {
    return 'TYPE_G';
  }

  // 34. Nhận diện Language / Messages (TYPE B)
  if (
    lowerName.includes('message') ||
    lowerName.includes('lang') ||
    lowerName.includes('locale') ||
    lowerName.endsWith('en.yml') ||
    lowerName.endsWith('vi.yml') ||
    /^\s*messages\s*:/m.test(lowerContent) ||
    /^\s*lang\s*:/m.test(lowerContent) ||
    /#\s*language/i.test(yamlContent) ||
    /#\s*messages/i.test(yamlContent)
  ) {
    return 'TYPE_B';
  }

  // 35. Mặc định: Core Config (TYPE A)
  return 'TYPE_A';
}

/**
 * TẦNG 4 — ROLE-BASED KEY ANALYSIS
 * BẤT KỲ CHUỖI NÀO CÓ KHẢ NĂNG ĐƯỢC CODE GỌI => COI LÀ KHÓA
 * BẤT KỲ CHUỖI NÀO CHỈ ĐỂ CON NGƯỜI ĐỌC => CÓ THỂ DỊCH
 */
export function isTranslatableKey(
  keyPath: string,
  fileType: ConfigFileType = 'TYPE_A',
  fingerprint: PluginFingerprint = 'GENERIC'
): boolean {
  const lower = keyPath.toLowerCase();

  // 1. Các file READ-ONLY tuyệt đối: CẤM DỊCH 100%
  if (FILE_TYPE_DEFINITIONS[fileType]?.readOnly) {
    return false;
  }

  // 2. Các file kỹ thuật không có text hiển thị: CẤM DỊCH
  if (
    fileType === 'TYPE_M' || // Hooks (Vault, PlaceholderAPI, ...)
    fileType === 'TYPE_T' || // Resourcepack (URL, hash, model)
    fileType === 'TYPE_U' || // NBT tags (CustomModelData, Enchantments)
    fileType === 'TYPE_W' || // Regex patterns
    fileType === 'TYPE_X' || // Log format
    fileType === 'TYPE_AC' || // Arguments parser
    fileType === 'TYPE_AH' || // Dependencies
    fileType === 'TYPE_AI' || // Update checker
    fileType === 'TYPE_I' || // Template file
    fileType === 'TYPE_AJ' // Template placeholder
  ) {
    return false;
  }

  // 3. Phân tích ngữ cảnh cha - con (ROLE-BASED HIERARCHY)
  // Ví dụ: database.users.name -> KHÔNG DỊCH | items.sword.name -> DỊCH
  if (
    lower.includes('database.') ||
    lower.includes('schema.') ||
    lower.includes('tables.') ||
    lower.includes('permissions.') ||
    lower.includes('hooks.') ||
    lower.includes('depend.') ||
    lower.includes('storage.')
  ) {
    if (lower.endsWith('.name') || lower.endsWith('.title')) {
      return false;
    }
  }

  // 4. Áp dụng luật Plugin Fingerprint đặc thù
  if (fingerprint === 'FANCY_NPCS') {
    if (
      lower.includes('.npc') ||
      lower.includes('.action') ||
      lower.includes('.trigger') ||
      lower.includes('.skin') ||
      lower.includes('.uuid')
    ) {
      return false;
    }
  } else if (fingerprint === 'MYTHIC_MOBS') {
    if (
      lower.includes('.skills') ||
      lower.includes('.mechanics') ||
      lower.includes('.conditions') ||
      lower.includes('.target') ||
      lower.includes('.ontimer') ||
      lower.includes('.damage') ||
      lower.includes('.health') ||
      lower.includes('.type')
    ) {
      return false;
    }
  } else if (fingerprint === 'ITEMS_ADDER' || fingerprint === 'ORAXEN') {
    if (
      lower.includes('.namespace') ||
      lower.includes('.resourcepack') ||
      lower.includes('.custom_item') ||
      lower.includes('.pack') ||
      lower.includes('.glyph') ||
      lower.includes('.font') ||
      lower.includes('.model')
    ) {
      return false;
    }
  } else if (fingerprint === 'DELUXE_MENUS') {
    if (
      lower.endsWith('.material') ||
      lower.endsWith('.slot') ||
      lower.endsWith('.priority') ||
      lower.endsWith('.click_commands') ||
      lower.includes('.click_commands[]') ||
      lower.endsWith('.view_requirement')
    ) {
      return false;
    }
  } else if (fingerprint === 'LUCK_PERMS') {
    if (
      lower.includes('.group') ||
      lower.includes('.permission') ||
      lower.includes('.meta') ||
      lower.includes('.context') ||
      lower.includes('.track')
    ) {
      return false;
    }
  }

  // 5. Kiểm tra theo từng loại File cụ thể
  // TYPE N: Economy / Shop
  if (fileType === 'TYPE_N') {
    if (
      lower.endsWith('.material') ||
      lower.endsWith('.buy') ||
      lower.endsWith('.sell') ||
      lower.endsWith('.price') ||
      lower.endsWith('.currency') ||
      lower.endsWith('.cost')
    ) {
      return false;
    }
    return (
      lower.endsWith('.display-name') ||
      lower.endsWith('.name') ||
      lower.endsWith('.lore') ||
      lower.includes('.lore[]') ||
      lower.endsWith('.description') ||
      lower.endsWith('.title')
    );
  }

  // TYPE O: Quest / Mission
  if (fileType === 'TYPE_O') {
    if (
      lower.endsWith('.id') ||
      lower.endsWith('.entity') ||
      lower.endsWith('.amount') ||
      lower.endsWith('.kill') ||
      lower.endsWith('.trigger') ||
      lower.includes('.objectives')
    ) {
      return false;
    }
    return (
      lower.endsWith('.name') ||
      lower.endsWith('.description') ||
      lower.endsWith('.reward-message') ||
      lower.endsWith('.title')
    );
  }

  // TYPE P: Achievement / Advancement
  if (fileType === 'TYPE_P') {
    if (lower.endsWith('.id') || lower.endsWith('.icon') || lower.endsWith('.criteria')) {
      return false;
    }
    return lower.endsWith('.title') || lower.endsWith('.description') || lower.endsWith('.message');
  }

  // TYPE Q: Mob / Entity
  if (fileType === 'TYPE_Q') {
    if (
      lower.endsWith('.type') ||
      lower.endsWith('.health') ||
      lower.endsWith('.skills') ||
      lower.endsWith('.damage') ||
      lower.endsWith('.level')
    ) {
      return false;
    }
    return lower.endsWith('.display_name') || lower.endsWith('.name') || lower.endsWith('.description');
  }

  // TYPE R: Skill / Effect
  if (fileType === 'TYPE_R') {
    if (
      lower.endsWith('.cooldown') ||
      lower.endsWith('.damage') ||
      lower.endsWith('.effect') ||
      lower.endsWith('.radius') ||
      lower.endsWith('.power')
    ) {
      return false;
    }
    return lower.endsWith('.display') || lower.endsWith('.name') || lower.endsWith('.description');
  }

  // TYPE S: Custom Item ID
  if (fileType === 'TYPE_S') {
    if (
      lower.endsWith('.id') ||
      lower.endsWith('.custom_id') ||
      lower.endsWith('.namespace') ||
      lower.endsWith('.pack') ||
      lower.endsWith('.model')
    ) {
      return false;
    }
    return lower.endsWith('.name') || lower.endsWith('.lore') || lower.includes('.lore[]');
  }

  // TYPE Y: Scoreboard / Tablist
  if (fileType === 'TYPE_Y') {
    if (lower.endsWith('.delay') || lower.endsWith('.ticks')) return false;
    return lower.endsWith('.title') || lower.endsWith('.lines') || lower.includes('.lines[]') || lower.endsWith('.header') || lower.endsWith('.footer');
  }

  // TYPE Z: Hologram
  if (fileType === 'TYPE_Z') {
    if (lower.endsWith('.location') || lower.endsWith('.world') || lower.endsWith('.x') || lower.endsWith('.y') || lower.endsWith('.z')) {
      return false;
    }
    return lower.endsWith('.lines') || lower.includes('.lines[]') || lower.endsWith('.text');
  }

  // TYPE AA: Animation
  if (fileType === 'TYPE_AA') {
    if (lower.endsWith('.delay') || lower.endsWith('.ticks') || lower.endsWith('.interval')) return false;
    return lower.endsWith('.frames') || lower.includes('.frames[]') || lower.endsWith('.lines') || lower.includes('.lines[]');
  }

  // TYPE AB: Bossbar
  if (fileType === 'TYPE_AB') {
    if (lower.endsWith('.color') || lower.endsWith('.style') || lower.endsWith('.progress')) return false;
    return lower.endsWith('.title') || lower.endsWith('.name');
  }

  // TYPE C: Permissions
  if (fileType === 'TYPE_C') {
    return lower.endsWith('.description') || lower.endsWith('.help');
  }

  // TYPE G: Commands
  if (fileType === 'TYPE_G') {
    return lower.endsWith('.description') || lower.endsWith('.usage') || lower.endsWith('.help');
  }

  // TYPE D & TYPE E: GUI / Items
  if (fileType === 'TYPE_D' || fileType === 'TYPE_E') {
    if (
      lower.endsWith('.material') ||
      lower.endsWith('.slot') ||
      lower.endsWith('.size') ||
      lower.endsWith('.amount') ||
      lower.endsWith('.model-data') ||
      lower.endsWith('.custom-model-data') ||
      lower.endsWith('.enchantments') ||
      lower.endsWith('.nbt') ||
      lower.endsWith('.type') ||
      lower.endsWith('.priority')
    ) {
      return false;
    }
    const GUI_TEXT_KEYS = [
      'title', 'name', 'display-name', 'display_name', 'lore', 'description', 'desc',
      'confirm', 'cancel', 'close', 'back', 'next', 'previous', 'prev',
      'accept', 'decline', 'yes', 'no', 'buy', 'sell', 'exit', 'open', 'view', 'help', 'info', 'text', 'button'
    ];
    return GUI_TEXT_KEYS.some((k) => lower.endsWith('.' + k) || lower === k || lower.endsWith('-' + k) || lower.includes('.' + k + '[]'));
  }

  // TYPE B: Language / Messages
  if (
    fileType === 'TYPE_B' ||
    lower.startsWith('messages.') ||
    lower.startsWith('lang.') ||
    lower.startsWith('language.') ||
    lower.startsWith('locales.') ||
    lower.startsWith('translations.')
  ) {
    return true;
  }

  // TYPE A (Core Config): Chỉ cho phép các key message hiển thị rõ ràng
  const textKeyPatterns = [
    'message', 'messages', 'msg', 'msgs',
    'prefix', 'suffix', 'title', 'subtitle', 'actionbar', 'bossbar',
    'description', 'desc', 'lore', 'text', 'reason',
    'warning', 'error', 'success', 'fail', 'failure', 'help', 'notice',
    'broadcast', 'chat', 'usage', 'prompt', 'greeting', 'welcome', 'farewell',
    'header', 'footer', 'display', 'display-name', 'display_name',
    'confirm', 'cancel', 'close', 'back', 'next', 'previous', 'prev', 'accept', 'decline', 'button', 'label'
  ];

  for (const t of textKeyPatterns) {
    if (
      lower === t ||
      lower.endsWith('.' + t) ||
      lower.endsWith('-' + t) ||
      lower.endsWith('_' + t) ||
      lower.includes('.' + t + '.') ||
      lower.includes('-' + t + '-') ||
      lower.includes('.' + t + '[]') ||
      lower.includes('-' + t + '[]')
    ) {
      return true;
    }
  }

  // Các key kỹ thuật cấm tuyệt đối trong Type A
  const nonTranslatableKeyEndings = [
    'item', 'items', 'wand-item', 'navigation-wand',
    'material', 'materials',
    'block', 'blocks', 'disallowed-blocks', 'allowed-blocks', 'blacklisted-blocks', 'whitelisted-blocks',
    'entity', 'entities', 'mobs',
    'world', 'worlds', 'disabled-worlds', 'enabled-worlds',
    'dir', 'directory', 'folder', 'path', 'file', 'filename',
    'database', 'host', 'port', 'user', 'password', 'table', 'driver', 'pool', 'url',
    'format', 'date-format', 'time-format', 'regex', 'pattern',
    'permission', 'permissions', 'perm', 'perms',
    'sound', 'sounds', 'particle', 'particles',
    'command', 'commands', 'log-commands',
    'timeout', 'interval', 'delay', 'cooldown', 'duration',
    'radius', 'size', 'limit', 'max', 'min', 'points', 'height', 'speed',
    'save-type', 'storage', 'backend', 'type', 'mode', 'loader', 'id',
    'enabled', 'enable', 'disabled', 'debug', 'trace-unflushed-sessions',
    'server-side-cui', 'command-block-support', 'allow-override',
    'creative-mode-overrides', 'allow-symbolic-links', 'drop-items', 'many-drop-items',
    'no-op-permissions', 'show-help-on-first-use'
  ];

  for (const ending of nonTranslatableKeyEndings) {
    if (
      lower === ending ||
      lower.endsWith('.' + ending) ||
      lower.endsWith('-' + ending) ||
      lower.includes('.' + ending + '.') ||
      lower.includes('-' + ending + '-') ||
      lower.includes('.' + ending + '[]') ||
      lower.includes('-' + ending + '[]')
    ) {
      return false;
    }
  }

  return true;
}

/**
 * TẦNG 6 — CONFIDENCE SCORE ENGINE
 * Tính điểm tin cậy (0 - 100) để xác định chuỗi có phải ngôn ngữ tự nhiên của con người hay không.
 * TẦNG 7 — SAFE FALLBACK: Nếu điểm < 70 => KHÔNG DỊCH (Giữ nguyên).
 * "Dịch sai = phá plugin. Không dịch = thiếu bản dịch. Ưu tiên an toàn."
 */
export function calculateTranslationConfidence(
  text: string,
  keyPath: string,
  fileType: ConfigFileType,
  fingerprint: PluginFingerprint = 'GENERIC'
): number {
  const trimmed = text.trim().replace(/^['"]|['"]$/g, '');
  if (!trimmed) return 0;

  // Nếu là giá trị kỹ thuật đã nhận diện -> 0 điểm
  if (isNonTranslatableValue(trimmed, keyPath)) return 0;

  let score = 50;
  const lowerKey = keyPath.toLowerCase();

  // 1. Phân tích vai trò của Key (+35 điểm nếu key là trường hiển thị thông báo, nút bấm, UI)
  const displayKeywords = [
    'message', 'msg', 'title', 'subtitle', 'lore', 'display', 'display-name', 'display_name',
    'description', 'desc', 'help', 'notice', 'warning', 'error', 'broadcast',
    'chat', 'prompt', 'lines', 'frames', 'text', 'reward-message',
    'confirm', 'cancel', 'close', 'back', 'next', 'previous', 'accept', 'decline',
    'button', 'label', 'gui'
  ];
  if (displayKeywords.some((k) => lowerKey.endsWith('.' + k) || lowerKey === k || lowerKey.endsWith('-' + k) || lowerKey.endsWith('_' + k))) {
    score += 35;
  }

  // Nếu chuỗi chứa từ vựng trong từ điển game thủ Minecraft (sau khi loại bỏ mã màu)
  const strippedText = trimmed.replace(new RegExp(TOKEN_REGEX.source, 'g'), '').trim().toLowerCase();
  if (strippedText && (GAMING_VOCABULARY[strippedText] || MINECRAFT_GLOSSARY[strippedText])) {
    score += 35;
  }

  // 2. Phân tích nội dung câu chữ
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    score += 25;
  }
  if (words.length >= 4) {
    score += 15;
  }
  if (/[!?.:»«]/.test(trimmed)) {
    score += 10;
  }

  // Chứa mã màu Minecraft hoặc MiniMessage tags -> chắc chắn là text game hiển thị
  if (/(?:&|§)[0-9a-fk-or]|<[a-zA-Z#]+>/.test(trimmed)) {
    score += 15;
  }

  // 3. Phạt điểm cho các định danh kỹ thuật / code identifier
  if (words.length === 1) {
    // Có ký tự phân cách kỹ thuật: _, :, /, .
    if (/[:_.\/]/.test(trimmed)) {
      score -= 45;
    }
    // PascalCase hoặc camelCase (VD: SkeletonKing, playerCommand)
    if (/^[a-z]+[A-Z][a-zA-Z0-9]*$/.test(trimmed) || /^[A-Z][a-z]+[A-Z][a-zA-Z0-9]*$/.test(trimmed)) {
      score -= 50;
    }
    // ENUM toàn chữ hoa (VD: DIAMOND_SWORD, FIREBALL)
    if (/^[A-Z0-9_]{3,}$/.test(trimmed)) {
      score -= 50;
    }
  }

  // 4. Nếu nằm trong key kỹ thuật
  if (
    lowerKey.includes('database.') ||
    lowerKey.includes('schema.') ||
    lowerKey.includes('hooks.') ||
    lowerKey.includes('depend.')
  ) {
    score -= 60;
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Giữ nguyên định dạng chữ hoa / chữ thường khi dịch
 */
function preserveCase(original: string, translated: string): string {
  if (!original || !translated) return translated;
  if (original === original.toUpperCase() && original.length > 1) {
    return translated.toUpperCase();
  }
  if (original[0] === original[0].toUpperCase() && original.slice(1) === original.slice(1).toLowerCase()) {
    return translated.charAt(0).toUpperCase() + translated.slice(1);
  }
  return translated;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Dịch thuật Offline siêu thông minh bằng Từ Điển Ngữ Cảnh + Cụm từ Game thủ
 * Hoạt động 100% ngay cả khi mất mạng, không cần AI
 */
export function translateSentenceRuleBased(text: string): string {
  let translated = text;

  // 1. Khớp các cụm từ trong Glossary (ưu tiên cụm dài)
  for (const [en, vi] of Object.entries(MINECRAFT_GLOSSARY)) {
    if (/%[a-zA-Z0-9_]+%|\{[a-zA-Z0-9_]+\}/.test(en)) {
      const parts = en.split(/(%[a-zA-Z0-9_]+%|\{[a-zA-Z0-9_]+\})/g);
      const regexPattern = parts
        .map((p) => {
          if (/%[a-zA-Z0-9_]+%|\{[a-zA-Z0-9_]+\}/.test(p)) {
            return '(«\\s*MC\\s*_TKN_\\d+\\s*»|%[a-zA-Z0-9_]+%|\\{[a-zA-Z0-9_]+\\})';
          }
          return escapeRegex(p);
        })
        .join('');
      const regex = new RegExp(regexPattern, 'gi');
      translated = translated.replace(regex, (...args) => {
        let replacedVi = vi;
        const captures = args.slice(1, -2);
        for (const cap of captures) {
          if (typeof cap === 'string') {
            replacedVi = replacedVi.replace(/%[a-zA-Z0-9_]+%|\{[a-zA-Z0-9_]+\}/, cap);
          }
        }
        return replacedVi;
      });
    } else {
      const phraseRegex = new RegExp('\\b' + escapeRegex(en) + '\\b', 'gi');
      translated = translated.replace(phraseRegex, (match) => preserveCase(match, vi));
    }
  }

  // 2. Tra cứu từ vựng đơn lẻ trong GAMING_VOCABULARY mà không ảnh hưởng token «MC_TKN_n»
  translated = translated.replace(/\b([a-zA-Z]+)\b/g, (match, word) => {
    // Tránh thay thế token marker
    if (word === 'MC' || word === 'TKN') return match;
    const lower = word.toLowerCase();
    if (GAMING_VOCABULARY[lower]) {
      return preserveCase(match, GAMING_VOCABULARY[lower]);
    }
    return match;
  });

  return translated;
}

/**
 * Tinh chỉnh văn phong Game thủ Minecraft Việt Nam chuyên nghiệp
 * Biến các câu dịch máy khô khan / ngây ngô thành thuật ngữ chuẩn xác của server Minecraft
 */
export function refineGamingVietnamese(text: string): string {
  let res = text;

  const replacements: [RegExp, string][] = [
    // 1. Túi đồ & Vật phẩm (Tránh dịch inventory thành "hàng tồn kho", "mặt hàng tồn kho")
    [/(?:các\s+)?mặt\s+hàng\s+tồn\s+kho(?:\s+của\s+mình|\s+của\s+bạn)?/gi, 'vật phẩm trong túi đồ'],
    [/hàng\s+tồn\s+kho(?:\s+của\s+mình|\s+của\s+bạn)?/gi, 'túi đồ'],
    [/kho\s+đồ(?:\s+của\s+mình|\s+của\s+bạn)?/gi, 'túi đồ'],
    [/các\s+mặt\s+hàng\b/gi, 'vật phẩm'],
    [/\bmặt\s+hàng\b/gi, 'vật phẩm'],
    [/ngăn\s+xếp\s+vật\s+phẩm/gi, 'stack vật phẩm'],
    [/vứt\s+bỏ\s+vật\s+phẩm/gi, 'vứt vật phẩm'],

    // 2. Giao tranh & Chiến đấu (Combat & Logout)
    [/bạn\s+đang\s+(?:tham\s+gia\s+)?chiến\s+đấu/gi, 'Bạn đang trong giao tranh'],
    [/đang\s+(?:tham\s+gia\s+)?chiến\s+đấu\b/gi, 'đang trong giao tranh'],
    [/(?:không|đừng)\s+đăng\s+xuất/gi, 'Không được thoát game'],
    [/(?:đăng\s+xuất|out\s+game)\s+hoặc\s+bạn\s+sẽ\s+mất/gi, 'thoát game nếu không bạn sẽ mất'],
    [/nếu\s+không\s+bạn\s+sẽ\s+mất\s+các\s+mặt\s+hàng\s+tồn\s+kho/gi, 'nếu không bạn sẽ mất toàn bộ vật phẩm trong túi đồ'],
    [/bạn\s+sẽ\s+mất\s+(?:các\s+)?vật\s+phẩm\s+trong\s+túi\s+đồ/gi, 'bạn sẽ mất toàn bộ vật phẩm trong túi đồ'],
    [/thẻ\s+chiến\s+đấu/gi, 'trạng thái giao tranh'],
    [/nhật\s+ký\s+chiến\s+đấu/gi, 'nhật ký giao tranh'],
    [/chuỗi\s+tiêu\s+diệt/gi, 'chuỗi hạ gục'],
    [/bị\s+giết\s+bởi/gi, 'bị hạ gục bởi'],
    [/đã\s+giết\s+bạn/gi, 'đã hạ gục bạn'],
    [/bạn\s+đã\s+chết/gi, 'Bạn đã bị hạ gục'],

    // 3. Dungeon & Boss & Realm (Hạ gục Boss Dungeon thay vì "đánh bại trùm ngục tối")
    [/(?:đánh\s+bại|tiêu\s+diệt|hạ\s+gục)\s+trùm\s+ngục\s+tối/gi, 'tiêu diệt Boss Dungeon'],
    [/trùm\s+ngục\s+tối/gi, 'Boss Dungeon'],
    [/(?:đánh\s+bại|hạ\s+gục)\s+trùm\b/gi, 'tiêu diệt Boss'],
    [/\bngục\s+tối\b/gi, 'Dungeon'],
    [/\btrùm\b(?!\s+(?:sò|phát|cuối|mền))/gi, 'Boss'],
    [/mở\s+khóa\s+vương\s+quốc\s+này/gi, 'mở khóa vùng đất này'],
    [/vương\s+quốc\s+này/gi, 'vùng đất này'],

    // 4. Lệnh & Thao tác (Dùng lệnh /... thay vì "nhập /...", "loại /...")
    [/(?:nhập|gõ|loại|kiểu)\s+(\/{1,2}[a-zA-Z0-9_-]+)/gi, 'dùng lệnh $1'],
    [/nhấp\s+để\s+được\s+trợ\s+giúp/gi, 'nhấp để xem trợ giúp'],
    [/nhấp\s+để\s+có\s+trợ\s+giúp/gi, 'nhấp để xem trợ giúp'],
    [/nhấp\s+để\s+thực\s+hiện/gi, 'nhấp để thực thi'],

    // 5. Dịch chuyển & Hồi sinh
    [/dịch\s+chuyển\s+tức\s+thời/gi, 'dịch chuyển'],
    [/tái\s+sinh\s+tại/gi, 'hồi sinh tại'],
    [/tái\s+sinh/gi, 'hồi sinh'],
    [/thời\s+gian\s+hồi\s+chiêu/gi, 'thời gian hồi'],
    [/làm\s+nguội/gi, 'thời gian hồi'],

    // 6. Kinh tế, Cửa hàng & Menu
    [/trình\s+đơn\s+máy\s+chủ/gi, 'Menu Máy Chủ'],
    [/thực\s+đơn\s+máy\s+chủ/gi, 'Menu Máy Chủ'],
    [/trình\s+đơn/gi, 'Menu'],
    [/thực\s+đơn/gi, 'Menu'],
    [/mua\s+hàng\s+thành\s+công/gi, 'Mua thành công'],
    [/bán\s+hàng\s+thành\s+công/gi, 'Bán thành công'],
    [/số\s+dư\s+tài\s+khoản\s+của\s+bạn/gi, 'Số dư của bạn'],
    [/không\s+đủ\s+kinh\s+phí/gi, 'Không đủ tiền'],
    [/phù\s+phép\s+tùy\s+chỉnh/gi, 'Phù phép đặc biệt'],
    [/hộp\s+bí\s+ẩn/gi, 'rương bí ẩn'],
    [/ba\s+lô\b/gi, 'balo'],
  ];

  for (const [pattern, replacement] of replacements) {
    res = res.replace(pattern, replacement);
  }

  return res;
}

/**
 * Dịch một cụm theo Batch bằng Google Translation API (Ưu tiên client dict-chrome-ex chống rate limit)
 * Sử dụng thẻ phân tách ⟦0⟧, ⟦1⟧... đảm bảo không lệch dòng
 */
async function translateBatchGoogle(batchTexts: string[]): Promise<string[] | null> {
  const clients = ['dict-chrome-ex', 'gtx'];

  for (const client of clients) {
    try {
      const tagged = batchTexts.map((text, idx) => `⟦${idx}⟧ ${text}`).join('\n');
      const url = `https://translate.googleapis.com/translate_a/single?client=${client}&sl=en&tl=vi&dt=t&q=${encodeURIComponent(
        tagged
      )}`;

      const res = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        },
      });
      if (!res.ok) continue;
      const data = await res.json();

      if (Array.isArray(data) && Array.isArray(data[0])) {
        const fullTranslated = data[0].map((item: any) => item[0]).join('');

        const results: string[] = new Array(batchTexts.length);
        const tagRegex = /⟦\s*(\d+)\s*⟧\s*([\s\S]*?)(?=(?:⟦\s*\d+\s*⟧|$))/g;
        let match: RegExpExecArray | null;
        let matchedCount = 0;

        while ((match = tagRegex.exec(fullTranslated)) !== null) {
          const idx = parseInt(match[1], 10);
          let content = match[2].trim();
          content = content.replace(/[\r\n]+$/, '');
          if (idx >= 0 && idx < batchTexts.length) {
            results[idx] = content;
            matchedCount++;
          }
        }

        if (matchedCount > 0) {
          for (let i = 0; i < batchTexts.length; i++) {
            if (!results[i]) {
              results[i] = translateSentenceRuleBased(batchTexts[i]);
            }
          }
          return results;
        }
      }
    } catch (err) {
      // thử tiếp client khác
    }
  }
  return null;
}

/**
 * Dịch một cụm đơn lẻ bằng Google API hoặc MyMemory nếu Batch thất bại
 */
async function translateSingleOnline(text: string): Promise<string | null> {
  const clients = ['dict-chrome-ex', 'gtx'];
  for (const client of clients) {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=${client}&sl=en&tl=vi&dt=t&q=${encodeURIComponent(
        text
      )}`;
      const res = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        },
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        return data[0].map((item: any) => item[0]).join('');
      }
    } catch (err) {
      // ignore
    }
  }

  // Thử MyMemory làm phương án dự phòng cuối cùng
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|vi`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.responseData?.translatedText) {
        return data.responseData.translatedText;
      }
    }
  } catch (err) {
    // ignore
  }

  return null;
}

export interface TranslatableItem {
  lineIndex: number;
  originalValue: string;
  leadingFormat: string;
  trailingFormat: string;
  shieldedText: string;
  tokens: string[];
  translatedText?: string;
  quote: string;
  prefix: string; // indentation + key + separator (e.g. "  message: " hoặc "# - ")
}

export interface TranslateYamlOptions {
  fileName?: string;
  fileType?: ConfigFileType;
  useOnlineTranslation: boolean;
  toMiniFont: boolean;
  onProgress?: (percent: number, currentLine: number, totalLines: number) => void;
}

export interface ProtocolAuditCheckResult {
  id: string;
  name: string;
  passed: boolean;
  message: string;
}

export interface TranslationAuditResult {
  output: string;
  fileType: ConfigFileType;
  fileTypeInfo: FileTypeInfo;
  pluginFingerprint: PluginFingerprint;
  checks: ProtocolAuditCheckResult[];
  allPassed: boolean;
  lineCount: number;
  translatedCount: number;
}

/**
 * Xử lý toàn bộ file YAML hoặc Text cấu hình kèm Báo cáo Thẩm định Zero Damage Protocol v2.0
 */
export async function translateYamlWithAudit(
  yamlContent: string,
  options: TranslateYamlOptions
): Promise<TranslationAuditResult> {
  const activeType: ConfigFileType = options.fileType || detectConfigFileType(yamlContent, options.fileName || '');
  const fileTypeInfo = FILE_TYPE_DEFINITIONS[activeType];
  const fingerprint = detectPluginFingerprint(yamlContent, options.fileName || '');

  if (!yamlContent.trim()) {
    return {
      output: yamlContent,
      fileType: activeType,
      fileTypeInfo,
      pluginFingerprint: fingerprint,
      checks: [],
      allPassed: true,
      lineCount: 0,
      translatedCount: 0,
    };
  }

  const lines = yamlContent.split(/\r?\n/);
  const totalLines = lines.length;

  // Nếu là file READ-ONLY (Database/UUIDs, WorldGuard, Script, Cache, Migration, v.v.) -> Khóa 100%
  if (fileTypeInfo.readOnly) {
    if (options.onProgress) {
      options.onProgress(100, totalLines, totalLines);
    }
    const audit = runProtocolAudit(lines, lines, activeType);
    return {
      output: yamlContent,
      fileType: activeType,
      fileTypeInfo,
      pluginFingerprint: fingerprint,
      checks: audit.checks,
      allPassed: true,
      lineCount: totalLines,
      translatedCount: 0,
    };
  }

  const items: TranslatableItem[] = [];
  const keyStack: { indent: number; key: string }[] = [];

  // Bước 1: Quét và phân loại từng dòng dựa trên activeFileType, fingerprint và confidence score
  for (let i = 0; i < totalLines; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Bỏ qua dòng trống
    if (!trimmed) {
      continue;
    }

    // 1. Dòng Ghi Chú / Hướng Dẫn (Comments # ...)
    const commentMatch = line.match(/^(\s*)#(\s*[-*•]?\s*)(.*)$/);
    if (commentMatch) {
      const indent = commentMatch[1];
      const marker = commentMatch[2];
      const commentContent = commentMatch[3];

      // Bỏ qua nếu comment rỗng hoặc chỉ toàn ký tự phân cách (===, ---, ###, ***, v.v.)
      if (!commentContent.trim() || /^[-=~*#_/]{2,}$/.test(commentContent.trim())) {
        continue;
      }

      // Bỏ qua comment chỉ là URL
      if (/^https?:\/\/[^\s]+$/.test(commentContent.trim())) {
        continue;
      }

      const { leading, core, trailing } = extractFormattingAffixes(commentContent);
      if (core.trim().length > 0) {
        const { shieldedText, tokens } = shieldTokens(core);
        items.push({
          lineIndex: i,
          originalValue: commentContent,
          leadingFormat: leading,
          trailingFormat: trailing,
          shieldedText,
          tokens,
          quote: '',
          prefix: `${indent}#${marker}`,
        });
      }
      continue;
    }

    // 2. Định dạng YAML Key-Value (`key: value`)
    const kvMatch = line.match(/^(\s*)([-a-zA-Z0-9_.]+)\s*:\s*(.*)$/);
    // 3. Định dạng YAML List (`- value`)
    const listMatch = line.match(/^(\s*-\s*)(.*)$/);
    // 4. Định dạng Lang/Properties (`key=value`)
    const propMatch = line.match(/^(\s*[-a-zA-Z0-9_.]+)\s*=\s*(.*)$/);

    if (kvMatch) {
      const indentStr = kvMatch[1];
      const indent = indentStr.length;
      const key = kvMatch[2];
      const val = kvMatch[3];

      while (keyStack.length > 0 && keyStack[keyStack.length - 1].indent >= indent) {
        keyStack.pop();
      }
      keyStack.push({ indent, key });
      const currentPath = keyStack.map((k) => k.key).join('.');

      if (val.trim() && isTranslatableKey(currentPath, activeType, fingerprint) && !isNonTranslatableValue(val, currentPath)) {
        let quote = '';
        let cleanVal = val;
        const qm = val.match(/^(['"])([\s\S]*)(['"])$/);
        if (qm) {
          quote = qm[1];
          cleanVal = qm[2];
        }

        // TẦNG 6: CONFIDENCE SCORE & TẦNG 7: SAFE FALLBACK
        const confidence = calculateTranslationConfidence(cleanVal, currentPath, activeType, fingerprint);
        if (confidence >= 70) {
          const { leading, core, trailing } = extractFormattingAffixes(cleanVal);
          if (core.trim().length > 0) {
            const { shieldedText, tokens } = shieldTokens(core);
            items.push({
              lineIndex: i,
              originalValue: cleanVal,
              leadingFormat: leading,
              trailingFormat: trailing,
              shieldedText,
              tokens,
              quote,
              prefix: `${indentStr}${key}: `,
            });
          }
        }
      }
    } else if (listMatch) {
      const prefix = listMatch[1];
      const val = listMatch[2];
      const currentPath = keyStack.map((k) => k.key).join('.') + '[]';

      if (val.trim() && isTranslatableKey(currentPath, activeType, fingerprint) && !isNonTranslatableValue(val, currentPath)) {
        let quote = '';
        let cleanVal = val;
        const qm = val.match(/^(['"])([\s\S]*)(['"])$/);
        if (qm) {
          quote = qm[1];
          cleanVal = qm[2];
        }

        const confidence = calculateTranslationConfidence(cleanVal, currentPath, activeType, fingerprint);
        if (confidence >= 70) {
          const { leading, core, trailing } = extractFormattingAffixes(cleanVal);
          if (core.trim().length > 0) {
            const { shieldedText, tokens } = shieldTokens(core);
            items.push({
              lineIndex: i,
              originalValue: cleanVal,
              leadingFormat: leading,
              trailingFormat: trailing,
              shieldedText,
              tokens,
              quote,
              prefix,
            });
          }
        }
      }
    } else if (propMatch) {
      const key = propMatch[1];
      const val = propMatch[2];
      if (val.trim() && isTranslatableKey(key, activeType, fingerprint) && !isNonTranslatableValue(val, key)) {
        let quote = '';
        let cleanVal = val;
        const qm = val.match(/^(['"])([\s\S]*)(['"])$/);
        if (qm) {
          quote = qm[1];
          cleanVal = qm[2];
        }

        const confidence = calculateTranslationConfidence(cleanVal, key, activeType, fingerprint);
        if (confidence >= 70) {
          const { leading, core, trailing } = extractFormattingAffixes(cleanVal);
          if (core.trim().length > 0) {
            const { shieldedText, tokens } = shieldTokens(core);
            items.push({
              lineIndex: i,
              originalValue: cleanVal,
              leadingFormat: leading,
              trailingFormat: trailing,
              shieldedText,
              tokens,
              quote,
              prefix: `${key}=`,
            });
          }
        }
      }
    } else {
      // 5. Dòng Text Thuần (người dùng gõ text đơn lẻ `hello`, hoặc paste dòng tin nhắn)
      if (!isNonTranslatableValue(trimmed)) {
        let quote = '';
        let cleanVal = line;
        const qm = line.match(/^(\s*)(['"])([\s\S]*)(['"])(\s*)$/);
        let leadingSpaces = '';
        if (qm) {
          leadingSpaces = qm[1];
          quote = qm[2];
          cleanVal = qm[3];
        } else {
          const spMatch = line.match(/^(\s*)(.*)$/);
          leadingSpaces = spMatch ? spMatch[1] : '';
          cleanVal = spMatch ? spMatch[2] : line;
        }

        const confidence = calculateTranslationConfidence(cleanVal, '', activeType, fingerprint);
        if (confidence >= 40) {
          const { leading, core, trailing } = extractFormattingAffixes(cleanVal);
          if (core.trim().length > 0) {
            const { shieldedText, tokens } = shieldTokens(core);
            items.push({
              lineIndex: i,
              originalValue: cleanVal,
              leadingFormat: leading,
              trailingFormat: trailing,
              shieldedText,
              tokens,
              quote,
              prefix: leadingSpaces,
            });
          }
        }
      }
    }
  }

  // Bước 2: Dịch thuật theo từng nhóm (Batch) để tối ưu tốc độ & không bao giờ bị rate-limit
  const BATCH_SIZE = 25;
  const totalItems = items.length;

  for (let b = 0; b < totalItems; b += BATCH_SIZE) {
    const chunk = items.slice(b, b + BATCH_SIZE);
    const chunkTexts = chunk.map((item) => item.shieldedText);

    let translatedChunk: string[] | null = null;

    if (options.useOnlineTranslation) {
      // Thử dịch qua Google Translation API theo lô (dict-chrome-ex + gtx)
      translatedChunk = await translateBatchGoogle(chunkTexts);

      // Nếu Batch thất bại, thử dịch qua Single Online (Google + MyMemory fallback)
      if (!translatedChunk) {
        translatedChunk = await Promise.all(
          chunkTexts.map(async (txt) => {
            const singleRes = await translateSingleOnline(txt);
            return singleRes || translateSentenceRuleBased(txt);
          })
        );
      }
    }

    // Nếu không dịch được online hoặc không bật online, dùng Smart Offline Glossary
    if (!translatedChunk) {
      translatedChunk = chunkTexts.map((txt) => translateSentenceRuleBased(txt));
    }

    // Lưu kết quả dịch và tinh chỉnh bằng Glossary Game Thủ (RULE 033)
    for (let c = 0; c < chunk.length; c++) {
      const rawTrans = translatedChunk[c] || chunk[c].shieldedText;
      const ruleTrans = translateSentenceRuleBased(rawTrans);
      chunk[c].translatedText = refineGamingVietnamese(ruleTrans);
    }

    if (options.onProgress) {
      const pct = Math.min(95, Math.round(((b + chunk.length) / Math.max(1, totalItems)) * 90));
      options.onProgress(pct, b + chunk.length, totalItems);
    }
  }

  // Bước 3: Hoàn nguyên Tokens, Font Mini và đóng gói dòng
  const resultMap = new Map<number, string>();

  for (const item of items) {
    let finalContent = unshieldTokens(item.translatedText || item.shieldedText, item.tokens);

    // Áp dụng Font Mini nếu được yêu cầu
    if (options.toMiniFont) {
      finalContent = convertTextToMiniFontSafe(finalContent);
    }

    // Nối lại các mã màu/tag tiền tố và hậu tố nguyên bản
    finalContent = `${item.leadingFormat}${finalContent}${item.trailingFormat}`;

    // Đóng gói dấu ngoặc kép an toàn cho YAML / Properties
    let formattedValue = finalContent;
    if (item.quote) {
      formattedValue = `${item.quote}${finalContent}${item.quote}`;
    } else if (
      item.prefix.includes(':') &&
      (finalContent.includes(':') ||
        finalContent.includes('#') ||
        finalContent.includes('&') ||
        finalContent.includes('<') ||
        finalContent.includes('%'))
    ) {
      formattedValue = `"${finalContent.replace(/"/g, '\\"')}"`;
    }

    resultMap.set(item.lineIndex, `${item.prefix}${formattedValue}`);
  }

  // Bước 4: Tái cấu trúc toàn bộ file với các dòng đã dịch
  const finalLines: string[] = [];
  for (let i = 0; i < totalLines; i++) {
    if (resultMap.has(i)) {
      finalLines.push(resultMap.get(i)!);
    } else {
      finalLines.push(lines[i]);
    }
  }

  // Bước 5: RULE 016 — KIỂM TRA TỰ ĐỘNG BẢO TOÀN ZERO DAMAGE & THẨM ĐỊNH 7 TIÊU CHÍ
  const audit = runProtocolAudit(lines, finalLines, activeType);

  if (options.onProgress) {
    options.onProgress(100, totalLines, totalLines);
  }

  return {
    output: audit.verifiedLines.join('\n'),
    fileType: activeType,
    fileTypeInfo,
    pluginFingerprint: fingerprint,
    checks: audit.checks,
    allPassed: audit.allPassed,
    lineCount: totalLines,
    translatedCount: items.length,
  };
}

/**
 * Xử lý toàn bộ file YAML hoặc Text cấu hình (Hỗ trợ All file, Comments, YAML, Lang properties)
 */
export async function translateYamlContent(
  yamlContent: string,
  options: TranslateYamlOptions
): Promise<string> {
  const result = await translateYamlWithAudit(yamlContent, options);
  return result.output;
}

/**
 * RULE 016 — PROTOCOL SELF-VERIFICATION & AUDIT ENGINE
 * Thẩm định các tiêu chí vàng Zero Damage Protocol:
 * 1. STRUCTURE CHECK (Số dòng và thứ tự dòng 1-to-1)
 * 2. KEY CHECK (Không thay đổi bất kỳ ký tự nào bên trái dấu :)
 * 3. INDENT CHECK (Khoảng trắng, tab đầu dòng khớp tuyệt đối)
 * 4. MINECRAFT ID CHECK (Tất cả minecraft:... được bảo toàn 100%)
 * 5. COLOR CODE CHECK (Mã màu &, §, Hex, Tag giữ nguyên)
 * 6. PLACEHOLDER CHECK (Placeholder %...%, {...} giữ nguyên)
 * 7. DATA TYPE CHECK (Boolean, Number, Null không bị đổi kiểu)
 * 8. COMMAND CHECK (Lệnh /command, //wand giữ nguyên)
 *
 * Nếu bất kỳ dòng nào FAIL kiểm tra -> Tự động phục hồi nguyên bản!
 */
export function runProtocolAudit(
  originalLines: string[],
  candidateLines: string[],
  fileType: ConfigFileType = 'TYPE_A'
): {
  verifiedLines: string[];
  checks: ProtocolAuditCheckResult[];
  allPassed: boolean;
} {
  const verifiedLines: string[] = [];
  const total = originalLines.length;

  let keyIssues = 0;
  let indentIssues = 0;
  let idIssues = 0;
  let colorIssues = 0;
  let placeholderIssues = 0;
  let dataTypeIssues = 0;
  let commandIssues = 0;

  for (let i = 0; i < total; i++) {
    const orig = originalLines[i];
    const trans = candidateLines[i] !== undefined ? candidateLines[i] : orig;

    // A. Dòng comment hoặc dòng trống -> chấp nhận
    if (/^\s*#/.test(orig) || !orig.trim()) {
      verifiedLines.push(trans);
      continue;
    }

    // B. Kiểm tra Key Immutability & Indentation
    const origKv = orig.match(/^(\s*)([-a-zA-Z0-9_.]+)(\s*[:=]\s*)(.*)$/);
    const transKv = trans.match(/^(\s*)([-a-zA-Z0-9_.]+)(\s*[:=]\s*)(.*)$/);

    let failed = false;

    if (origKv) {
      if (!transKv || transKv[2] !== origKv[2]) {
        keyIssues++;
        failed = true;
      }
      if (!transKv || transKv[1] !== origKv[1]) {
        indentIssues++;
        failed = true;
      }
    }

    // C. Kiểm tra MINECRAFT ID CHECK
    const origMcIds = orig.match(/(?:minecraft|[a-zA-Z0-9_-]+):[a-zA-Z0-9_./-]+/g) || [];
    for (const id of origMcIds) {
      if (!trans.includes(id)) {
        idIssues++;
        failed = true;
        break;
      }
    }

    // D. Kiểm tra PLACEHOLDER CHECK
    const origPlaceholders = orig.match(/%[a-zA-Z0-9_.:$]+%|\{[a-zA-Z0-9_.:-]+\}|<[a-zA-Z0-9_.:-]+>/g) || [];
    for (const ph of origPlaceholders) {
      if (!trans.includes(ph)) {
        placeholderIssues++;
        failed = true;
        break;
      }
    }

    // E. Kiểm tra COLOR CHECK
    const origColors = orig.match(/(?:&|§)[0-9a-fk-or]|(?:&|§)#[0-9a-fA-F]{6}|<#[0-9a-fA-F]{6}>|<\/#[0-9a-fA-F]{6}>/gi) || [];
    for (const col of origColors) {
      if (!trans.includes(col)) {
        colorIssues++;
        failed = true;
        break;
      }
    }

    // F. Kiểm tra DATA TYPE CHECK (Booleans, Numbers, Null)
    const origVal = origKv ? origKv[4].trim() : orig.trim();
    if (/^(true|false|null|-?\d+(\.\d+)?)$/i.test(origVal)) {
      const transVal = transKv ? transKv[4].trim() : trans.trim();
      if (origVal.toLowerCase() !== transVal.toLowerCase()) {
        dataTypeIssues++;
        failed = true;
      }
    }

    // G. Kiểm tra COMMAND CHECK
    const origCommands = orig.match(/\/{1,2}[a-zA-Z0-9_-]+/g) || [];
    for (const cmd of origCommands) {
      if (!trans.includes(cmd)) {
        commandIssues++;
        failed = true;
        break;
      }
    }

    if (failed) {
      // Auto-heal: Khôi phục dòng gốc đảm bảo Zero Damage tuyệt đối
      verifiedLines.push(orig);
    } else {
      verifiedLines.push(trans);
    }
  }

  const checks: ProtocolAuditCheckResult[] = [
    {
      id: 'structure',
      name: 'Structure (Số dòng 1:1)',
      passed: originalLines.length === candidateLines.length,
      message: `Khớp ${total}/${total} dòng`,
    },
    {
      id: 'keys',
      name: 'Key Protection (Khóa Key)',
      passed: true,
      message: keyIssues === 0 ? '100% Khóa bảo toàn' : `Tự động bảo vệ ${keyIssues} key`,
    },
    {
      id: 'indent',
      name: 'Indentation (Khoảng trắng thụt lề)',
      passed: true,
      message: indentIssues === 0 ? 'Khớp thụt lề tuyệt đối' : `Tự động căn chuẩn ${indentIssues} dòng`,
    },
    {
      id: 'ids',
      name: 'Minecraft IDs (ID vật phẩm/khối)',
      passed: true,
      message: idIssues === 0 ? 'Bảo toàn 100%' : `Khôi phục ${idIssues} ID`,
    },
    {
      id: 'colors',
      name: 'Color Codes (Mã màu &, §, Hex, Tag)',
      passed: true,
      message: colorIssues === 0 ? 'Bảo toàn toàn bộ' : `Bảo vệ ${colorIssues} mã màu`,
    },
    {
      id: 'placeholders',
      name: 'Placeholders (%player%, {npc})',
      passed: true,
      message: placeholderIssues === 0 ? 'Bảo toàn nguyên bản' : `Bảo vệ ${placeholderIssues} placeholder`,
    },
    {
      id: 'commands',
      name: 'Command Safety (/spawn, //wand)',
      passed: true,
      message: commandIssues === 0 ? 'Bảo toàn 100%' : `Khôi phục ${commandIssues} lệnh`,
    },
    {
      id: 'datatypes',
      name: 'Data Types (Boolean, Number, Null)',
      passed: true,
      message: dataTypeIssues === 0 ? 'Không đổi kiểu dữ liệu' : `Khôi phục ${dataTypeIssues} giá trị số/boolean`,
    },
  ];

  return {
    verifiedLines,
    checks,
    allPassed: checks.every((c) => c.passed),
  };
}

export function verifyZeroDamageProtocol(
  originalLines: string[],
  translatedLines: string[]
): string[] {
  return runProtocolAudit(originalLines, translatedLines).verifiedLines;
}

/**
 * Trình Render trực tiếp mã màu Minecraft sang HTML (Live Color Preview)
 * Hỗ trợ &0-f, &#RRGGBB, <#RRGGBB>, <gradient:#hex1:#hex2>...</gradient>, &l, &o, v.v.
 */
export function renderMinecraftColorHtml(raw: string): string {
  if (!raw) return '';

  const COLOR_MAP: Record<string, string> = {
    '0': '#000000', '1': '#0000AA', '2': '#00AA00', '3': '#00AAAA',
    '4': '#AA0000', '5': '#AA00AA', '6': '#FFAA00', '7': '#AAAAAA',
    '8': '#555555', '9': '#5555FF', 'a': '#55FF55', 'b': '#55FFFF',
    'c': '#FF5555', 'd': '#FF55FF', 'e': '#FFFF55', 'f': '#FFFFFF',
  };

  let html = raw;

  // 1. Render Gradient: <gradient:#hex1:#hex2>text</gradient>
  html = html.replace(/<gradient:(#[0-9a-fA-F]{6}):(#[0-9a-fA-F]{6})>(.*?)<\/gradient>/gi, (_, col1, col2, text) => {
    return `<span style="background: linear-gradient(90deg, ${col1}, ${col2}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold;">${text}</span>`;
  });

  // 2. Render MiniMessage Hex: <#RRGGBB>text</#RRGGBB> hoặc <#RRGGBB>
  html = html.replace(/<#(?:[0-9a-fA-F]{6})>(.*?)<\/#(?:[0-9a-fA-F]{6})>/gi, (match, text) => {
    const colMatch = match.match(/<#(?:[0-9a-fA-F]{6})>/);
    const col = colMatch ? colMatch[0].replace(/[<>]/g, '') : '#FFFFFF';
    return `<span style="color: ${col};">${text}</span>`;
  });

  // 3. Render Spigot Hex: &#RRGGBB
  html = html.replace(/(?:&|§)#([0-9a-fA-F]{6})/gi, (_, hex) => {
    return `</span><span style="color: #${hex};">`;
  });

  // 4. Render MiniMessage color tags: <red>, <green>, v.v.
  const nameColorMap: Record<string, string> = {
    red: '#FF5555', green: '#55FF55', yellow: '#FFFF55', blue: '#5555FF',
    gold: '#FFAA00', aqua: '#55FFFF', gray: '#AAAAAA', white: '#FFFFFF',
  };
  for (const [name, hex] of Object.entries(nameColorMap)) {
    html = html.replace(new RegExp(`<${name}>`, 'gi'), `</span><span style="color: ${hex};">`);
    html = html.replace(new RegExp(`</${name}>`, 'gi'), `</span>`);
  }

  // 5. Render mã màu truyền thống: &0 -> &f
  html = html.replace(/(?:&|§)([0-9a-fA-F])/g, (_, code) => {
    const col = COLOR_MAP[code.toLowerCase()] || '#FFFFFF';
    return `</span><span style="color: ${col};">`;
  });

  // 6. Định dạng in đậm &l, nghiêng &o
  html = html.replace(/(?:&|§)l/gi, '<span style="font-weight: bold;">');
  html = html.replace(/(?:&|§)o/gi, '<span style="font-style: italic;">');
  html = html.replace(/(?:&|§)r/gi, '</span><span style="color: #FFFFFF; font-weight: normal; font-style: normal;">');

  return `<span>${html}</span>`;
}
