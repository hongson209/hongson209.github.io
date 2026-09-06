'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search, Download, Trash2, Loader2, Package, ChevronLeft, ChevronRight,
  ChevronDown, Check, ArrowUpRight
} from 'lucide-react';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';

export interface PluginVersion {
  versionNumber: string;
  gameVersions: string[];
  downloadUrl: string;
  filename: string;
  loaders?: string[];
}

export interface PluginItem {
  id: string;
  name: string;
  description: string;
  icon?: string;
  source: 'modrinth' | 'hangar' | 'spigot';
  author: string;
  downloads?: string;
  likes?: string;
  projectUrl?: string;
  versions: PluginVersion[];
}

export const DEFAULT_PLUGINS: PluginItem[] = [
  {
    id: 'simple-voice-chat',
    name: 'Simple Voice Chat',
    description: 'A working voice chat in Minecraft! Proximity chat, group chats, and audio recording.',
    icon: 'https://cdn.modrinth.com/data/9eGKb6K1/icon.png',
    source: 'modrinth',
    author: 'henkelmax',
    downloads: '35.5M',
    likes: '10.1k',
    projectUrl: 'https://modrinth.com/plugin/simple-voice-chat',
    versions: [
      {
        versionNumber: 'bukkit-2.6.23',
        gameVersions: ['1.20.4', '1.21', '1.21.4'],
        downloadUrl: 'https://cdn.modrinth.com/data/9eGKb6K1/versions/IhqyykOv/voicechat-bukkit-2.6.23.jar',
        filename: 'voicechat-bukkit-2.6.23.jar',
        loaders: ['bukkit', 'paper', 'spigot'],
      },
      {
        versionNumber: 'bukkit-2.5.25',
        gameVersions: ['1.20.1', '1.20.2'],
        downloadUrl: 'https://cdn.modrinth.com/data/9eGKb6K1/versions/IhqyykOv/voicechat-bukkit-2.6.23.jar',
        filename: 'voicechat-bukkit-2.5.25.jar',
        loaders: ['bukkit', 'paper'],
      },
    ],
  },
  {
    id: 'veinminer',
    name: 'Veinminer',
    description: 'Mine the whole vein on mining a single ore. Known feature by modpacks and pvp games like UHC (quick mine).',
    icon: 'https://cdn.modrinth.com/data/OhduvhIc/5ea1f538e66ee4d4e5e571ad952cba0e06e0bd5c.png',
    source: 'modrinth',
    author: 'Miraculixx',
    downloads: '32.7M',
    likes: '3.8k',
    projectUrl: 'https://modrinth.com/plugin/veinminer',
    versions: [
      {
        versionNumber: '2.12.1',
        gameVersions: ['1.20.4', '1.21', '1.21.4'],
        downloadUrl: 'https://cdn.modrinth.com/data/OhduvhIc/versions/qztdh63o/veinminer-paper-2.12.1.jar',
        filename: 'veinminer-paper-2.12.1.jar',
        loaders: ['paper', 'purpur'],
      },
      {
        versionNumber: '2.11.0',
        gameVersions: ['1.20.1'],
        downloadUrl: 'https://cdn.modrinth.com/data/OhduvhIc/versions/qztdh63o/veinminer-paper-2.12.1.jar',
        filename: 'veinminer-paper-2.11.0.jar',
        loaders: ['paper'],
      },
    ],
  },
  {
    id: 'veinminer-enchantment',
    name: 'Veinminer Enchantment',
    description: 'Veinminer Addon - Adds veinminer enchantment to enchanting tables. Only tools with the enchantment can veinmine.',
    icon: 'https://cdn.modrinth.com/data/4sP0LXxp/1e37ba60062cf9455fc75d61c653a75d11825783.png',
    source: 'modrinth',
    author: 'Miraculixx',
    downloads: '11.6M',
    likes: '888',
    projectUrl: 'https://modrinth.com/plugin/veinminer-enchantment',
    versions: [
      {
        versionNumber: '2.11.2',
        gameVersions: ['1.20.4', '1.21', '1.21.1'],
        downloadUrl: 'https://cdn.modrinth.com/data/4sP0LXxp/versions/ybkUAVuf/veinminer-enchant-2.11.2%2B1.21.1.jar',
        filename: 'veinminer-enchant-2.11.2+1.21.1.jar',
        loaders: ['paper', 'spigot'],
      },
    ],
  },
  {
    id: 'chunky',
    name: 'Chunky',
    description: 'Pre-generates chunks, quickly and efficiently. Eliminates map exploration lag on server.',
    icon: 'https://cdn.modrinth.com/data/fALzjamp/e1954413665e57b7bae1feef44eda530270c7d47_96.webp',
    source: 'modrinth',
    author: 'pop4959',
    downloads: '9.3M',
    likes: '4.7k',
    projectUrl: 'https://modrinth.com/plugin/chunky',
    versions: [
      {
        versionNumber: '1.5.3',
        gameVersions: ['1.20.4', '1.20.1', '1.21'],
        downloadUrl: 'https://cdn.modrinth.com/data/fALzjamp/versions/MdY6JATr/Chunky-Bukkit-1.5.3.jar',
        filename: 'Chunky-Bukkit-1.5.3.jar',
        loaders: ['bukkit', 'paper', 'spigot'],
      },
    ],
  },
  {
    id: 'worldedit',
    name: 'WorldEdit',
    description: 'A Minecraft Map Editor... that runs in-game! With selections, schematics, copy, paste and brushes.',
    icon: 'https://cdn.modrinth.com/data/1u6JkXh5/30698991048ced77e60c4e8284007d3782f2e6a3_96.webp',
    source: 'modrinth',
    author: 'me4502',
    downloads: '5.5M',
    likes: '3.7k',
    projectUrl: 'https://modrinth.com/plugin/worldedit',
    versions: [
      {
        versionNumber: '7.4.5',
        gameVersions: ['1.20.4', '1.20.1', '1.21'],
        downloadUrl: 'https://cdn.modrinth.com/data/1u6JkXh5/versions/F5ea2ov3/worldedit-bukkit-7.4.5.jar',
        filename: 'worldedit-bukkit-7.4.5.jar',
        loaders: ['bukkit', 'paper', 'spigot'],
      },
    ],
  },
  {
    id: 'luckperms',
    name: 'LuckPerms',
    description: 'An advanced permissions plugin for Minecraft servers, proxies and networks.',
    icon: 'https://cdn.modrinth.com/data/Vebnzrzj/90943902cc650e95b167265b8f2d7c893f82c8f4_96.webp',
    source: 'modrinth',
    author: 'Luck',
    downloads: '18.2M',
    likes: '15.4k',
    projectUrl: 'https://modrinth.com/plugin/luckperms',
    versions: [
      {
        versionNumber: '5.5.71',
        gameVersions: ['1.20.4', '1.20.1', '1.21'],
        downloadUrl: 'https://cdn.modrinth.com/data/Vebnzrzj/versions/b0mk8uS6/LuckPerms-Bukkit-5.5.71.jar',
        filename: 'LuckPerms-Bukkit-5.5.71.jar',
        loaders: ['bukkit', 'paper', 'spigot'],
      },
    ],
  },
  {
    id: 'viaversion',
    name: 'ViaVersion',
    description: 'Allow newer Java Edition clients to connect to older server versions seamlessly.',
    icon: 'https://cdn.modrinth.com/data/P1OZGk5p/ad14260a7308dc9e4c3385f3f6b5bdabfe17f295_96.webp',
    source: 'modrinth',
    author: 'Gerrygames',
    downloads: '15.1M',
    likes: '12.3k',
    projectUrl: 'https://modrinth.com/plugin/viaversion',
    versions: [
      {
        versionNumber: '5.12.0',
        gameVersions: ['1.20.4', '1.20.1', '1.21'],
        downloadUrl: 'https://cdn.modrinth.com/data/P1OZGk5p/versions/I7EtZ7sn/ViaVersion-5.12.0-SNAPSHOT.jar',
        filename: 'ViaVersion-5.12.0.jar',
        loaders: ['bukkit', 'paper', 'spigot', 'velocity'],
      },
    ],
  },
  {
    id: 'coreprotect',
    name: 'CoreProtect',
    description: 'Fast, efficient data logging and anti-griefing tool. Rollback and restore any amount of damage.',
    icon: 'https://cdn.modrinth.com/data/Lu3KuzdV/b2c4b7b0033ab09cc166f2848003ef3a02c70a83.png',
    source: 'modrinth',
    author: 'Intelli',
    downloads: '4.9M',
    likes: '3.2k',
    projectUrl: 'https://modrinth.com/plugin/coreprotect',
    versions: [
      {
        versionNumber: '24.0',
        gameVersions: ['1.20.4', '1.20.1', '1.21'],
        downloadUrl: 'https://cdn.modrinth.com/data/Lu3KuzdV/versions/Kma0kBsY/CoreProtect-CE-24.0.jar',
        filename: 'CoreProtect-CE-24.0.jar',
        loaders: ['bukkit', 'paper', 'spigot', 'purpur'],
      },
    ],
  },
  {
    id: 'essentialsx',
    name: 'EssentialsX',
    description: 'The essential plugin suite for Paper and Spigot servers providing over 100 commands.',
    icon: 'https://cdn.modrinth.com/data/hXiIvTyT/e621675be1d0421b43b65ab8082507532d937009_96.webp',
    source: 'modrinth',
    author: 'EssentialsX Team',
    downloads: '7.8M',
    likes: '6.4k',
    projectUrl: 'https://modrinth.com/plugin/essentialsx',
    versions: [
      {
        versionNumber: '2.22.0',
        gameVersions: ['1.20.4', '1.20.1', '1.21'],
        downloadUrl: 'https://cdn.modrinth.com/data/hXiIvTyT/versions/nY6VN1XH/EssentialsX-2.22.0.jar',
        filename: 'EssentialsX-2.22.0.jar',
        loaders: ['bukkit', 'paper', 'spigot'],
      },
    ],
  },
];

function CustomPluginVersionDropdown({
  plugin,
  selectedIndex,
  onSelectIndex,
  onOpen,
  isLoading,
  versions,
}: {
  plugin: PluginItem;
  selectedIndex: number;
  onSelectIndex: (idx: number) => void;
  onOpen: () => void;
  isLoading?: boolean;
  versions: PluginVersion[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next) {
      onOpen();
    }
  };

  const currentVer = versions[selectedIndex] || versions[0] || {
    versionNumber: 'Latest',
    gameVersions: ['1.21.x'],
  };

  let displayVer = currentVer.versionNumber || 'Latest';
  if (/^[a-zA-Z0-9]{8}$/.test(displayVer)) {
    displayVer = 'Latest';
  } else if (!displayVer.toLowerCase().startsWith('v') && !displayVer.toLowerCase().startsWith('bukkit')) {
    displayVer = `v${displayVer}`;
  }

  const mcBadge = currentVer.gameVersions?.[currentVer.gameVersions.length - 1];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        className={`flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/60 hover:bg-white/[0.08] border transition-all text-[10px] font-mono shadow-sm group/btn ${
          isOpen
            ? 'border-indigo-500/70 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.3)]'
            : 'border-white/10 hover:border-white/25 text-indigo-300 hover:text-white'
        }`}
        title="Chọn phiên bản chi tiết"
      >
        <span className="font-semibold truncate max-w-[70px]">
          {displayVer}
        </span>
        {mcBadge && (
          <span className="hidden xl:inline-block px-1 py-0.2 rounded bg-indigo-500/15 text-cyan-300 text-[8px] border border-indigo-500/25">
            {mcBadge}
          </span>
        )}
        <ChevronDown
          className={`w-3 h-3 text-indigo-400 group-hover/btn:text-cyan-300 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180 text-cyan-400' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-1.5 z-50 w-52 max-h-48 overflow-y-auto rounded-xl bg-[#0b0e17]/95 border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.85)] backdrop-blur-2xl p-1 no-scrollbar animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-gray-400 border-b border-white/10 flex items-center justify-between">
            <span>Chọn phiên bản</span>
            <span className="text-emerald-400 font-bold">{versions.length} bản</span>
          </div>

          {isLoading && versions.length <= 1 ? (
            <div className="py-4 flex items-center justify-center gap-2 text-xs font-mono text-emerald-400">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Đang tải danh sách...</span>
            </div>
          ) : (
            <div className="space-y-0.5 py-1">
              {versions.map((v, i) => {
                const isSelected = selectedIndex === i;
                let vLabel = v.versionNumber;
                if (/^[a-zA-Z0-9]{8}$/.test(vLabel)) {
                  vLabel = 'Latest';
                } else if (!vLabel.toLowerCase().startsWith('v') && !vLabel.toLowerCase().startsWith('bukkit')) {
                  vLabel = `v${vLabel}`;
                }
                const mcTag = v.gameVersions?.[v.gameVersions.length - 1];

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      onSelectIndex(i);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs font-mono transition-all ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="truncate">{vLabel}</span>
                      {mcTag && (
                        <span className="px-1 py-0.2 rounded bg-black/50 text-[9px] text-cyan-300 border border-white/10">
                          MC {mcTag}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PluginHub() {
  const [viewMode, setViewMode] = useState<'browse' | 'manage'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [provider, setProvider] = useState<'all' | 'modrinth' | 'hangar' | 'spigot'>('modrinth');
  const [pageSize, setPageSize] = useState<number>(6);
  const [sortBy, setSortBy] = useState<'downloads' | 'relevance' | 'newest'>('downloads');
  const [loader, setLoader] = useState<string>('paper');
  const [mcVersion, setMcVersion] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalHits, setTotalHits] = useState<number>(DEFAULT_PLUGINS.length);
  const [plugins, setPlugins] = useState<PluginItem[]>(DEFAULT_PLUGINS);
  const [selectedVersions, setSelectedVersions] = useState<Record<string, number>>({});
  const [selectedQueue, setSelectedQueue] = useState<{
    id: string;
    name: string;
    version: string;
    filename: string;
    downloadUrl: string;
    icon?: string;
    source: string;
  }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState('');
  const [versionsCache, setVersionsCache] = useState<Record<string, PluginVersion[]>>({});
  const [loadingVersions, setLoadingVersions] = useState<Record<string, boolean>>({});

  const fetchProjectVersions = async (projectId: string) => {
    if (versionsCache[projectId] || loadingVersions[projectId]) return;

    setLoadingVersions((prev) => ({ ...prev, [projectId]: true }));
    try {
      const res = await fetch(`https://api.modrinth.com/v2/project/${projectId}/version`);
      if (res.ok) {
        const data = await res.json();
        const serverLoaders = ['paper', 'spigot', 'purpur', 'bukkit', 'folia', 'velocity', 'bungeecord'];
        let filtered = data.filter((v: any) => v.loaders?.some((l: string) => serverLoaders.includes(l)));
        if (!filtered || filtered.length === 0) filtered = data;

        const loadedVersions: PluginVersion[] = filtered.slice(0, 15).map((v: any) => {
          const rawVer = String(v.version_number || 'Latest');
          const mainFile = v.files?.find((f: any) => f.primary) || v.files?.[0];
          return {
            versionNumber: rawVer,
            gameVersions: v.game_versions || [],
            downloadUrl: mainFile?.url || '',
            filename: mainFile?.filename || `${projectId}.jar`,
            loaders: v.loaders || ['paper'],
          };
        });

        if (loadedVersions.length > 0) {
          setVersionsCache((prev) => ({ ...prev, [projectId]: loadedVersions }));
          setPlugins((prev) =>
            prev.map((p) => (p.id === projectId ? { ...p, versions: loadedVersions } : p))
          );
        }
      }
    } catch (err) {
      console.error('Failed to fetch versions for', projectId, err);
    } finally {
      setLoadingVersions((prev) => ({ ...prev, [projectId]: false }));
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, provider, pageSize, sortBy, loader, mcVersion]);

  useEffect(() => {
    let isCancelled = false;

    const fetchPlugins = async () => {
      setIsLoading(true);
      try {
        const q = searchQuery.trim();
        const facets: string[][] = [['project_type:plugin']];

        if (loader !== 'all') {
          facets.push([`categories:${loader}`]);
        }
        if (mcVersion !== 'all') {
          facets.push([`versions:${mcVersion}`]);
        }

        const offset = (currentPage - 1) * pageSize;
        const index = sortBy === 'relevance' ? 'relevance' : sortBy === 'downloads' ? 'downloads' : 'newest';
        const url = `https://api.modrinth.com/v2/search?query=${encodeURIComponent(q)}&facets=${encodeURIComponent(
          JSON.stringify(facets)
        )}&limit=${pageSize}&offset=${offset}&index=${index}`;

        const res = await fetch(url);
        if (res.ok && !isCancelled) {
          const data = await res.json();
          setTotalHits(data.total_hits || 0);

          const hits: PluginItem[] = (data.hits || []).map((h: any) => {
            const pId = h.slug || h.project_id;
            const mcVersions = h.versions || [];
            return {
              id: pId,
              name: h.title,
              description: h.description || 'Minecraft plugin từ Modrinth ecosystem.',
              icon: h.icon_url,
              source: 'modrinth' as const,
              author: h.author || 'Developer',
              downloads:
                h.downloads > 1000000
                  ? `${(h.downloads / 1000000).toFixed(1)}M`
                  : h.downloads > 1000
                  ? `${(h.downloads / 1000).toFixed(0)}k`
                  : String(h.downloads || 0),
              likes: h.follows ? `${(h.follows / 1000).toFixed(1)}k` : undefined,
              projectUrl: `https://modrinth.com/plugin/${pId}`,
              versions: versionsCache[pId] || [
                {
                  versionNumber: 'Latest',
                  gameVersions: mcVersions.slice(-3),
                  downloadUrl: `https://api.modrinth.com/v2/project/${h.project_id}/version`,
                  filename: `${pId}.jar`,
                  loaders: h.loaders || ['paper', 'spigot', 'purpur'],
                },
              ],
            };
          });

          if (hits.length > 0) {
            setPlugins(hits);
            hits.forEach((item) => {
              fetchProjectVersions(item.id);
            });
          } else if (currentPage === 1 && !q && loader === 'paper' && mcVersion === 'all') {
            setPlugins(DEFAULT_PLUGINS);
            setTotalHits(DEFAULT_PLUGINS.length);
          } else {
            setPlugins([]);
          }
        }
      } catch (err) {
        if (!isCancelled && currentPage === 1) {
          setPlugins(DEFAULT_PLUGINS);
          setTotalHits(DEFAULT_PLUGINS.length);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    const timer = setTimeout(() => {
      fetchPlugins();
    }, 250);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [searchQuery, provider, pageSize, sortBy, loader, mcVersion, currentPage]);

  const totalPages = Math.max(1, Math.ceil(totalHits / pageSize));

  const pageNumbers: (number | string)[] = (() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  })();

  const toggleSelect = async (plugin: PluginItem) => {
    const exists = selectedQueue.some((item) => item.id === plugin.id);

    if (exists) {
      setSelectedQueue((prev) => prev.filter((item) => item.id !== plugin.id));
    } else {
      const vIndex = selectedVersions[plugin.id] || 0;
      let versionObj = plugin.versions[vIndex] || plugin.versions[0];
      let finalDownloadUrl = versionObj.downloadUrl;
      let finalFilename = versionObj.filename;

      if (finalDownloadUrl.includes('api.modrinth.com/v2/project/') && finalDownloadUrl.endsWith('/version')) {
        try {
          const vRes = await fetch(finalDownloadUrl);
          if (vRes.ok) {
            const vList = await vRes.json();
            const bukkitVer =
              vList.find((v: any) =>
                v.loaders?.some((l: string) => ['bukkit', 'paper', 'spigot', 'purpur'].includes(l))
              ) || vList[0];
            if (bukkitVer && bukkitVer.files && bukkitVer.files[0]) {
              finalDownloadUrl = bukkitVer.files[0].url;
              finalFilename = bukkitVer.files[0].filename || finalFilename;
            }
          }
        } catch {}
      }

      setSelectedQueue((prev) => [
        ...prev,
        {
          id: plugin.id,
          name: plugin.name,
          version: versionObj.versionNumber,
          filename: finalFilename,
          downloadUrl: finalDownloadUrl,
          icon: plugin.icon,
          source: plugin.source,
        },
      ]);
    }
  };

  const removeFromQueue = (id: string) => {
    setSelectedQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDownloadZip = async () => {
    if (selectedQueue.length === 0 || isZipping) return;

    setIsZipping(true);
    setZipProgress('Đang chuẩn bị gói nén...');

    try {
      const zip = new JSZip();
      const pluginsFolder = zip.folder('plugins');
      let successCount = 0;

      for (let i = 0; i < selectedQueue.length; i++) {
        const item = selectedQueue[i];
        setZipProgress(`Đang tải (${i + 1}/${selectedQueue.length}): ${item.filename || item.name}...`);

        try {
          let downloadUrl = item.downloadUrl;

          if (downloadUrl.includes('api.modrinth.com/v2/project/') && downloadUrl.endsWith('/version')) {
            const vRes = await fetch(downloadUrl);
            if (vRes.ok) {
              const vList = await vRes.json();
              const bukkitVer =
                vList.find((v: any) =>
                  v.loaders?.some((l: string) => ['bukkit', 'paper', 'spigot', 'purpur'].includes(l))
                ) || vList[0];
              if (bukkitVer?.files?.[0]?.url) {
                downloadUrl = bukkitVer.files[0].url;
                item.filename = bukkitVer.files[0].filename || item.filename;
              }
            }
          }

          const fileRes = await fetch(downloadUrl);
          if (fileRes.ok) {
            const arrayBuffer = await fileRes.arrayBuffer();
            if (pluginsFolder) {
              pluginsFolder.file(item.filename, arrayBuffer);
            } else {
              zip.file(`plugins/${item.filename}`, arrayBuffer);
            }
            successCount++;
          }
        } catch (fetchErr) {
          console.error('Error fetching jar:', item.name, fetchErr);
        }
      }

      zip.file(
        'README_CAI_DAT.txt',
        `=======================================================\n` +
        ` GÓI PLUGINS MINECRAFT - NGUYỄN HỒNG SƠN PROFILE\n` +
        ` Thời gian đóng gói: ${new Date().toLocaleString('vi-VN')}\n` +
        ` Tổng số plugin: ${selectedQueue.length}\n` +
        ` Số file .jar đã nén thành công: ${successCount}\n` +
        `=======================================================\n\n` +
        `HƯỚNG DẪN CÀI ĐẶT:\n` +
        `1. Mở thư mục "plugins" trong file zip này.\n` +
        `2. Sao chép toàn bộ file .jar vào thư mục "plugins" của máy chủ Minecraft (Paper / Purpur / Spigot).\n` +
        `3. Khởi động lại máy chủ (Restart Server) để plugin được kích hoạt.\n\n` +
        `Danh sách file kèm theo:\n` +
        selectedQueue.map((p, idx) => `${idx + 1}. ${p.filename} (v${p.version})`).join('\n') +
        `\n\nChúc server của bạn vận hành mượt mà và thành công! ✨\n`
      );

      setZipProgress('Đang nén file .ZIP...');
      const zipContent = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
      });

      const downloadAnchor = document.createElement('a');
      const blobUrl = URL.createObjectURL(zipContent);
      downloadAnchor.href = blobUrl;
      downloadAnchor.download = `Minecraft_Plugins_Pack_${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);
      URL.revokeObjectURL(blobUrl);

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#6366f1', '#38bdf8', '#00dfd8'],
      });

      setZipProgress(`Hoàn tất! Đã nén ${successCount} file .jar 🎉`);
      setTimeout(() => {
        setZipProgress('');
      }, 4000);
    } catch (err) {
      setZipProgress('Lỗi nén zip, vui lòng thử lại.');
      setTimeout(() => setZipProgress(''), 3000);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="bg-[#0b0d14]/90 rounded-2xl border border-white/10 p-3 sm:p-4 shadow-xl flex flex-col justify-between transition-all">
      {/* Top Header: Sub-tabs (Browse Plugins | Manage Plugins) */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setViewMode('browse')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold font-mono transition-all ${
              viewMode === 'browse'
                ? 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/40 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span>Browse Plugins</span>
          </button>

          <button
            onClick={() => setViewMode('manage')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold font-mono transition-all ${
              viewMode === 'manage'
                ? 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/40 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Package className="w-4 h-4 text-emerald-400" />
            <span>Manage Plugins</span>
            {selectedQueue.length > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-mono font-bold">
                {selectedQueue.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          {zipProgress && (
            <span className="text-xs font-mono text-cyan-300 animate-pulse hidden sm:inline">
              {zipProgress}
            </span>
          )}
          {selectedQueue.length > 0 && (
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold text-white bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 border border-emerald-400/30 flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              {isZipping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>ZIP ({selectedQueue.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 sm:gap-2.5 mb-3 items-end">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">PROVIDER</span>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value as any)}
            className="bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs font-mono text-gray-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="modrinth" className="bg-gray-900">Modrinth</option>
            <option value="all" className="bg-gray-900">All Providers</option>
            <option value="hangar" className="bg-gray-900">Hangar</option>
            <option value="spigot" className="bg-gray-900">Spigot</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">SIZE</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs font-mono text-gray-200 focus:outline-none focus:border-emerald-500"
          >
            <option value={6} className="bg-gray-900">6 / page</option>
            <option value={12} className="bg-gray-900">12 / page</option>
            <option value={24} className="bg-gray-900">24 / page</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">SORT BY</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs font-mono text-gray-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="downloads" className="bg-gray-900">Downloads</option>
            <option value="relevance" className="bg-gray-900">Relevance</option>
            <option value="newest" className="bg-gray-900">Newest</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">LOADER</span>
          <select
            value={loader}
            onChange={(e) => setLoader(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs font-mono text-gray-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="paper" className="bg-gray-900">Paper</option>
            <option value="purpur" className="bg-gray-900">Purpur</option>
            <option value="spigot" className="bg-gray-900">Spigot</option>
            <option value="velocity" className="bg-gray-900">Velocity</option>
            <option value="all" className="bg-gray-900">All Loaders</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">VERSION</span>
          <select
            value={mcVersion}
            onChange={(e) => setMcVersion(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs font-mono text-gray-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all" className="bg-gray-900">All Versions</option>
            <option value="1.21" className="bg-gray-900">1.21.x</option>
            <option value="1.20.4" className="bg-gray-900">1.20.4</option>
            <option value="1.20.1" className="bg-gray-900">1.20.1</option>
            <option value="1.19.4" className="bg-gray-900">1.19.4</option>
            <option value="1.16.5" className="bg-gray-900">1.16.5</option>
          </select>
        </div>

        <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">SEARCH</span>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plugins..."
              className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
            />
            {isLoading && (
              <Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-400 animate-spin" />
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'browse' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 overflow-y-auto max-h-[250px] sm:max-h-[270px] min-h-[220px] pr-1.5 no-scrollbar flex-1">
            {isLoading && plugins.length === 0 ? (
              <div className="col-span-full text-center py-16 text-gray-400 font-mono text-xs flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
                <span>Đang tải danh sách plugins...</span>
              </div>
            ) : plugins.length === 0 ? (
              <div className="col-span-full text-center py-16 text-gray-400 font-mono text-xs">
                Không tìm thấy plugin nào phù hợp với bộ lọc hiện tại.
              </div>
            ) : (
              plugins.map((plugin) => {
                const isSelected = selectedQueue.some((item) => item.id === plugin.id);
                const currentVIndex = selectedVersions[plugin.id] || 0;

                return (
                  <div
                    key={plugin.id}
                    className={`rounded-2xl border p-3 sm:p-3.5 flex flex-col justify-between transition-all duration-200 group relative ${
                      isSelected
                        ? 'border-emerald-500/60 bg-emerald-950/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                        : 'border-white/10 bg-black/40 hover:border-white/20 hover:bg-black/60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-black/50 border border-white/10 overflow-hidden flex items-center justify-center flex-shrink-0 p-0.5 shadow-sm group-hover:border-emerald-500/40 transition-colors">
                        {plugin.icon ? (
                          <img src={plugin.icon} alt={plugin.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <Package className="w-5 h-5 text-emerald-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm sm:text-[15px] text-white truncate group-hover:text-emerald-300 transition-colors">
                          {plugin.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-gray-400 mt-0.5 truncate">
                          {plugin.downloads && <span>📥 {plugin.downloads}</span>}
                          {plugin.likes && <span>❤️ {plugin.likes}</span>}
                          {plugin.author && <span className="truncate">👤 {plugin.author}</span>}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 line-clamp-2 my-2 leading-relaxed min-h-[34px]">
                      {plugin.description}
                    </p>

                    <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-white/5 mt-1">
                      <a
                        href={plugin.projectUrl || `https://modrinth.com/plugin/${plugin.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="Xem trang Modrinth"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      <CustomPluginVersionDropdown
                        plugin={plugin}
                        selectedIndex={currentVIndex}
                        onSelectIndex={(newIdx) =>
                          setSelectedVersions((prev) => ({
                            ...prev,
                            [plugin.id]: newIdx,
                          }))
                        }
                        onOpen={() => fetchProjectVersions(plugin.id)}
                        isLoading={loadingVersions[plugin.id]}
                        versions={plugin.versions}
                      />

                      <button
                        onClick={() => toggleSelect(plugin)}
                        className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
                          isSelected
                            ? 'bg-emerald-600 text-white border border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                            : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/30'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Đã chọn</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Install</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Phân Trang (Pagination Bar) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 pt-2 mt-1.5 border-t border-white/10 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px]">
                Trang <strong className="text-white">{currentPage}</strong> / <strong className="text-white">{totalPages}</strong>
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-[10px] text-gray-400" suppressHydrationWarning>
                {totalHits.toLocaleString('en-US')} plugins
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1 || isLoading}
                className="px-2 py-0.5 rounded-lg bg-black/50 hover:bg-white/10 text-gray-300 disabled:opacity-30 disabled:hover:bg-black/50 border border-white/10 transition-all flex items-center gap-1 text-[11px]"
              >
                <ChevronLeft className="w-3 h-3" />
                <span className="hidden sm:inline">Trước</span>
              </button>

              <div className="flex items-center gap-1">
                {pageNumbers.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => typeof p === 'number' && setCurrentPage(p)}
                    disabled={p === '...' || isLoading}
                    className={`min-w-[24px] h-6 px-1 rounded-lg text-[11px] font-semibold transition-all ${
                      p === currentPage
                        ? 'bg-emerald-600 text-white font-bold border border-emerald-400/50 shadow-sm'
                        : p === '...'
                        ? 'text-gray-600 cursor-default'
                        : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages || isLoading}
                className="px-2 py-0.5 rounded-lg bg-black/50 hover:bg-white/10 text-gray-300 disabled:opacity-30 disabled:hover:bg-black/50 border border-white/10 transition-all flex items-center gap-1 text-[11px]"
              >
                <span className="hidden sm:inline">Sau</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {selectedQueue.length > 0 && (
            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between gap-2 bg-black/50 px-3 py-1.5 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-gray-300">
                  Đã chọn: <strong className="text-emerald-400 font-bold">{selectedQueue.length}</strong> plugins
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('manage')}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Xem giỏ ({selectedQueue.length})
                </button>
                <button
                  onClick={handleDownloadZip}
                  disabled={isZipping}
                  className="px-3.5 py-1 rounded-lg text-xs font-mono font-bold text-white bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 shadow-md transition-all active:scale-95 flex items-center gap-1.5 border border-emerald-400/30"
                >
                  {isZipping ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>ĐANG NÉN...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>TẢI TRỌN BỘ (.ZIP)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col flex-1 min-h-[240px] justify-between">
          <div className="overflow-y-auto max-h-[240px] space-y-1.5 pr-1 no-scrollbar flex-1">
            {selectedQueue.length === 0 ? (
              <div className="text-center py-16 text-gray-500 font-mono text-xs flex flex-col items-center gap-2.5">
                <Package className="w-10 h-10 opacity-30 text-gray-400" />
                <span>Chưa chọn plugin nào vào giỏ tải về.</span>
                <button
                  onClick={() => setViewMode('browse')}
                  className="mt-1 px-4 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs hover:bg-emerald-500 hover:text-white transition-all"
                >
                  Quay lại Browse Plugins
                </button>
              </div>
            ) : (
              selectedQueue.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-black/40 border border-white/10 text-xs group"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-black/50 border border-white/10 overflow-hidden flex items-center justify-center flex-shrink-0">
                      {item.icon ? (
                        <img src={item.icon} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-white truncate block text-xs">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 truncate block">
                        File: {item.filename} (v{item.version})
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromQueue(item.id)}
                    className="p-2 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors flex-shrink-0"
                    title="Xóa khỏi giỏ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {selectedQueue.length > 0 && (
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 mt-2">
              <button
                onClick={() => setSelectedQueue([])}
                className="px-3 py-1.5 rounded-xl text-xs font-mono text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                Xóa tất cả ({selectedQueue.length})
              </button>

              <button
                onClick={handleDownloadZip}
                disabled={isZipping}
                className="px-5 py-2 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 shadow-md shadow-emerald-900/30 active:scale-95 transition-all flex items-center gap-2 border border-emerald-400/30"
              >
                {isZipping ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>ĐANG ĐÓNG GÓI ZIP...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>TẢI TRỌN BỘ PLUGINS (.ZIP)</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

