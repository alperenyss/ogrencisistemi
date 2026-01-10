"use client";

import { useState } from "react";
import { Send, User } from "lucide-react";

export default function StaffMessagesPage() {
    const [selectedConversation, setSelectedConversation] = useState(1);
    const [message, setMessage] = useState("");

    const conversations = [
        { id: 1, name: "Ahmet Yılmaz", lastMessage: "Hocam sınav tarihi hakkında...", time: "10:30", unread: true },
        { id: 2, name: "Zeynep Kaya", lastMessage: "Teşekkür ederim.", time: "Dün", unread: false },
        { id: 3, name: "Mehmet Demir", lastMessage: "Ödev teslimi için...", time: "2 gün", unread: false },
    ];

    const messages = [
        { id: 1, sender: "student", text: "Hocam merhaba, sınav tarihini değiştirebilir miyiz?", time: "10:15" },
        { id: 2, sender: "staff", text: "Merhaba Ahmet, maalesef takvim kesinleşti.", time: "10:25" },
        { id: 3, sender: "student", text: "Anladım hocam, teşekkürler.", time: "10:30" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="page-title">Yazışmalar</h1>
                <p className="page-subtitle">Öğrenci mesajları</p>
            </div>

            <div className="grid grid-cols-3 gap-5 h-[600px]">
                {/* Conversation List */}
                <div className="col-span-1 card overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-semibold text-slate-800">Gelen Kutusu</h3>
                    </div>
                    <div className="overflow-y-auto flex-1">
                        {conversations.map(conv => (
                            <div
                                key={conv.id}
                                onClick={() => setSelectedConversation(conv.id)}
                                className={`p-4 border-b border-slate-50 cursor-pointer transition-colors ${selectedConversation === conv.id
                                        ? 'bg-blue-50 border-l-2 border-l-blue-500'
                                        : 'hover:bg-slate-50'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <p className={`text-sm ${conv.unread ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}>
                                        {conv.name}
                                    </p>
                                    <span className="text-xs text-slate-400">{conv.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message View */}
                <div className="col-span-2 card overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
                            <User className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                            <span className="font-semibold text-slate-800">Ahmet Yılmaz</span>
                            <p className="text-xs text-slate-400">Öğrenci • 2021123456</p>
                        </div>
                    </div>
                    <div className="p-6 flex-1 overflow-y-auto space-y-4 bg-slate-50/30">
                        {messages.map(msg => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'staff' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[70%] p-3 rounded-2xl ${msg.sender === 'staff'
                                        ? 'bg-blue-500 text-white rounded-br-md'
                                        : 'bg-white border border-slate-100 text-slate-700 rounded-bl-md'
                                    }`}>
                                    <p className="text-sm">{msg.text}</p>
                                    <p className={`text-[10px] mt-1 ${msg.sender === 'staff' ? 'text-blue-100' : 'text-slate-400'}`}>
                                        {msg.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-slate-100 flex gap-3">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-1 px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white placeholder:text-slate-400"
                            placeholder="Mesaj yazın..."
                        />
                        <button className="btn btn-primary">
                            <Send className="w-4 h-4" />
                            Gönder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
