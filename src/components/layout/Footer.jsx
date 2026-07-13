import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import Logo from "./Logo";
const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Gostaria de agendar uma consulta.";

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Logo imgClassName="h-16" className="mb-6" />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Saúde de qualidade ao seu alcance. Consultas, exames e procedimentos com tecnologia de ponta e acolhimento humanizado.
            </p>
            <div className="flex items-center gap-2 text-[#46BEE6] text-sm font-semibold">
              <div className="w-2 h-2 rounded-full bg-[#46BEE6] animate-pulse" />
              12.450+ vidas cuidadas
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Navegação</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Início", path: "/" },
                { label: "Especialidades", path: "/especialidades" },
                { label: "Exames", path: "/exames" },
                { label: "Quem Somos", path: "/quem-somos" },
                { label: "Blog", path: "/blog" },
                { label: "FAQ", path: "/faq" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-400 hover:text-[#46BEE6] transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Contato</h4>
            <div className="flex flex-col gap-4">
              <a href="tel:+5500000000000" className="flex items-start gap-3 text-gray-400 hover:text-[#46BEE6] transition-colors text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                (00) 0000-0000
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-gray-400 hover:text-[#46BEE6] transition-colors text-sm">
                <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                WhatsApp
              </a>
              <a href="mailto:contato@clinicameta.com.br" className="flex items-start gap-3 text-gray-400 hover:text-[#46BEE6] transition-colors text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                contato@clinicameta.com.br
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Rua da Saúde, 123 — Centro
              </div>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Seg a Sex: 7h às 19h | Sáb: 7h às 12h
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Responsável Técnico</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-sm font-mono text-[#46BEE6] mb-1">Dr. Gustavo Silva</p>
              <p className="text-xs font-mono text-gray-400 mb-1">CRM/SP 000000</p>
              <p className="text-xs font-mono text-gray-400 mb-3">RQE 00000</p>
              <p className="text-xs text-gray-500">Diretor Técnico</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Clínica Meta — Consultas e Exames. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <Link to="/faq" className="hover:text-[#46BEE6] transition-colors">Política de Privacidade</Link>
            <Link to="/faq" className="hover:text-[#46BEE6] transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}