'use client';

import React from 'react';
import { Users, ExternalLink } from 'lucide-react';

export interface Friend {
  name: string;
  role: string;
  avatar: string;
  status: string;
  tag: string;
  link?: string;
  badgeColor: string;
  description: string;
}

export default function TabFriends() {
  const friends: Friend[] = [
    {
      name: 'Kotoba Studio Crew',
      role: 'Dev Team & Co-creators',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kotoba',
      status: 'Đang phát triển dự án',
      tag: 'Team Core',
      link: 'https://github.com/orgs/Kotoba-Studio',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      description: 'Nhóm nghiên cứu và phát triển phần mềm, bot và AI tools.',
    },
    {
      name: 'MewMC Staff Team',
      role: 'Minecraft Builders & Admins',
      avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=MewMCStaff',
      status: 'Online • Quản trị Server',
      tag: 'Minecraft',
      link: 'https://discord.gg/5uq862p3W7',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      description: 'Đội ngũ phụ trách build map và quản trị máy chủ MewMC.',
    },
    {
      name: 'Discord Vibe Coders',
      role: 'AI & Full Stack Enthusiasts',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=VibeCoders',
      status: 'Học hỏi & Chia sẻ prompt',
      tag: 'Community',
      link: 'https://discord.gg/5uq862p3W7',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      description: 'Cộng đồng lập trình viên đam mê AI và coding thực chiến.',
    },
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="bg-card/90 rounded-2xl border border-card-border p-3 sm:p-3.5 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Users className="w-4 h-4" />
          </span>
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400">
            Friends &amp; Collaborators
          </span>
        </div>
        <span className="text-xs font-mono text-gray-500">3 Communities</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {friends.map((friend) => (
          <div
            key={friend.name}
            className="bg-card/90 rounded-2xl border border-card-border p-3.5 sm:p-4 shadow-md flex flex-col justify-between group hover:border-indigo-500/40 hover:bg-[#161a29] transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-black/40 border border-white/10 p-0.5">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <span className={'px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-mono border ' + friend.badgeColor}>
                  {friend.tag}
                </span>
              </div>

              <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-indigo-300 transition-colors">
                {friend.name}
              </h4>
              <p className="text-xs text-indigo-400/90 font-mono mt-0.5">
                {friend.role}
              </p>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-2">
                {friend.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono truncate">
                ● {friend.status}
              </span>
              {friend.link && (
                <a
                  href={friend.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

