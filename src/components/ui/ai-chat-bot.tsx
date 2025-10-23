import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, Send, Bot, User, Minimize2, Maximize2, 
  X, Mic, MicOff, Volume2, VolumeX, RotateCcw,
  TrendingUp, BarChart3, PieChart, Activity, Brain
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'chart' | 'data';
}

interface AIChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AIChatBot({ isOpen, onToggle }: AIChatBotProps) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Xin chào! Tôi là AI Assistant của hệ thống Dashboard Kinh tế Việt Nam. Tôi có thể giúp bạn:\n\n• Giải thích dữ liệu kinh tế\n• Phân tích xu hướng\n• Tạo báo cáo\n• Trả lời câu hỏi chuyên môn\n\nBạn cần hỗ trợ gì?',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedQuestions = [
    "GDP Việt Nam hiện tại như thế nào?",
    "Tỷ lệ thất nghiệp năm 2024?",
    "So sánh xuất khẩu với năm trước",
    "Phân tích ngành công nghiệp",
    "Dự báo kinh tế 2025"
  ];

  const aiResponses: Record<string, string> = {
    "gdp": "GDP Việt Nam Q3/2024 đạt 105.2 nghìn tỷ VND, tăng 7.3% so với cùng kỳ năm trước. Đây là mức tăng trưởng tích cực, vượt mục tiêu 6.8% đề ra. Các ngành đóng góp chính:\n\n📈 Công nghiệp: 38.2% GDP\n🏢 Dịch vụ: 49.3% GDP\n🌾 Nông nghiệp: 12.5% GDP",
    
    "thất nghiệp": "Tỷ lệ thất nghiệp Việt Nam năm 2024 được duy trì ở mức thấp 3.8%, giảm 0.3% so với năm 2023. Điểm nổi bật:\n\n✅ Lao động có việc làm: 96.2%\n📊 Lao động qua đào tạo: 68.5%\n🏭 Việc làm công nghiệp: tăng 8.9%\n💼 Việc làm dịch vụ: tăng 7.1%",
    
    "xuất khẩu": "Kim ngạch xuất khẩu 2024 ước đạt 350.8 tỷ USD, tăng 9.2% so với 2023. Nhóm hàng xuất khẩu chủ lực:\n\n📱 Điện tử & viễn thông: 158.7 tỷ USD\n👔 Dệt may & giày dép: 94.1 tỷ USD\n⚙️ Máy móc & thiết bị: 75.3 tỷ USD\n🌾 Nông sản & thực phẩm: 49.8 tỷ USD",
    
    "công nghiệp": "Ngành công nghiệp Việt Nam 2024 có những điểm sáng:\n\n🚀 Tăng trưởng: 8.5% (cao hơn mục tiêu)\n🏭 Sản xuất: Tăng 12.3%\n⚡ Năng suất lao động: Tăng 6.7%\n🔧 Công nghệ cao: Chiếm 15.8% tổng sản lượng\n💡 Đầu tư FDI: 23.2 tỷ USD",
    
    "dự báo": "Dự báo kinh tế Việt Nam 2025:\n\n📈 GDP: Tăng 6.5-7.0%\n💹 CPI: Kiểm soát dưới 4.5%\n📊 Xuất khẩu: Tăng 8-10%\n💼 Thất nghiệp: Duy trì dưới 4%\n🏗️ Đầu tư: Tăng 12-15%\n\nCác yếu tố tích cực: Phục hồi kinh tế toàn cầu, FTA hiệu lực, cải cách thể chế."
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const response = generateAIResponse(content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('gdp') || input.includes('tăng trưởng')) {
      return aiResponses.gdp;
    } else if (input.includes('thất nghiệp') || input.includes('việc làm')) {
      return aiResponses["thất nghiệp"];
    } else if (input.includes('xuất khẩu') || input.includes('kim ngạch')) {
      return aiResponses["xuất khẩu"];
    } else if (input.includes('công nghiệp') || input.includes('sản xuất')) {
      return aiResponses["công nghiệp"];
    } else if (input.includes('dự báo') || input.includes('2025')) {
      return aiResponses["dự báo"];
    } else {
      return `Tôi hiểu bạn quan tâm về "${userInput}". Dựa trên dữ liệu hiện tại:\n\n• Hệ thống đang phân tích dữ liệu liên quan\n• Vui lòng đặt câu hỏi cụ thể hơn về GDP, việc làm, xuất khẩu, công nghiệp hoặc dự báo\n• Hoặc chọn một trong các câu hỏi gợi ý bên dưới\n\nTôi có thể giúp bạn phân tích sâu hơn!`;
    }
  };

  const handleQuestionClick = (question: string) => {
    sendMessage(question);
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      content: 'Chat đã được xóa. Tôi có thể giúp gì cho bạn?',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }]);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className={`fixed bottom-4 right-4 z-50 ${isMinimized ? 'w-80' : 'w-96'} ${isMinimized ? 'h-16' : 'h-[600px]'} bg-background border border-border rounded-lg shadow-2xl backdrop-blur-lg`}
    >
      <Card className="h-full card-premium">
        {/* Header */}
        <CardHeader className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center"
                animate={{ rotate: isTyping ? 360 : 0 }}
                transition={{ duration: 2, repeat: isTyping ? Infinity : 0 }}
              >
                <Brain className="h-4 w-4 text-primary-foreground" />
              </motion.div>
              <div>
                <CardTitle className="text-sm font-bold">AI Assistant</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="status-dot active"></div>
                  <span className="text-xs text-muted-foreground">
                    {isTyping ? "Đang suy nghĩ..." : "Sẵn sàng hỗ trợ"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                className="h-8 w-8 p-0"
              >
                {isSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onToggle}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-gradient-primary text-primary-foreground'
                      }`}>
                        {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Questions */}
            <div className="p-4 border-t border-border">
              <div className="mb-3">
                <p className="text-xs text-muted-foreground mb-2">Câu hỏi gợi ý:</p>
                <div className="flex flex-wrap gap-1">
                  {predefinedQuestions.slice(0, 3).map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-6 px-2"
                      onClick={() => handleQuestionClick(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Nhập câu hỏi của bạn..."
                    className="pr-10"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        sendMessage(inputValue);
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsListening(!isListening)}
                    className="absolute right-1 top-1 h-6 w-6 p-0"
                  >
                    {isListening ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                  </Button>
                </div>
                <Button
                  size="sm"
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clearChat}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}

// Chat Bot Toggle Button Component
export function ChatBotToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <AIChatBot 
            isOpen={isOpen} 
            onToggle={() => setIsOpen(false)} 
          />
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full shadow-lg bg-gradient-primary hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          </Button>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="absolute -top-12 -left-32 bg-background border border-border rounded-lg px-3 py-2 shadow-lg"
          >
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              💬 AI trợ lý kinh tế
            </p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}