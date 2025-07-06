import { linksHeader } from "@/types";
import {
  Settings,
  Bookmark,
  Users,
  BarChart2,
  Heart,
  UserRound as UserRoundPen,
  MapPin,
  WalletCards,
  Bell,
  Shield as ShieldUser,
  LayoutDashboard,
  Box,
} from "lucide-react";
import { MenuGroup } from "@/types";
import { userType } from "@/types/next-auth";

export const commonLinks: linksHeader[] = [
  {
    title: "مدونة عقاري",
    url: "/blog",
  },
  {
    title: "ابحث عن الوكيل",
    url: "#",
    isNew: true,
  },
  {
    title: "المشاريع الجديدة",
    url: "#",
  },
];
export const BlogLinks: linksHeader[] = [
  {
    title: "نصائح",
    url: "/blog/categories/نصائح",
  },
  {
    title: "منوعات",
    url: "/blog/categories/منوعات",
  },
  {
    title: "اتجاهات السوق",
    url: "/blog/categories/اتجاهات-السوق",
  },
  {
    title: "فعاليات واخبار بيوت مصر",
    url: "/blog/categories/فعاليات-واخبار-بيوت-مصر",
    isNew: true,
  },
];

export const menuGroups: { [key in userType]: MenuGroup[] } = {
  user: [
    {
      items: [
        {
          title: "ادارة التنبيهات",
          href: "/user/orders",
          icon: Bell,
        },
      ],
    },
  ],
  seller: [
    {
      items: [
        {
          title: "لوحة التحكم",
          href: "/seller",
          icon: LayoutDashboard,
        },
        {
          title: "المنتجات",
          href: "/seller/products",
          icon: Box,
        },
      ],
    },
    {
      title: "حسابي",
      items: [
        {
          title: "الملف الشخصي",
          href: "/seller/profile",
          icon: UserRoundPen,
        },
        {
          title: "العناوين",
          href: "/seller/addresses",
          icon: MapPin,
        },
        {
          title: "طرق الدفع",
          href: "/seller/payments",
          icon: WalletCards,
        },
        {
          title: "المفضلة",
          href: "/wishlist",
          icon: Heart,
        },
      ],
    },
    {
      title: "أخرى",
      items: [
        {
          title: "الإشعارات",
          href: "/seller/notifications",
          icon: Bell,
        },
        {
          title: "إعدادات الأمان",
          href: "/seller/security",
          icon: ShieldUser,
        },
      ],
    },
  ],
  admin: [
    {
      title: "لوحة تحكم المدير",
      items: [
        {
          title: "لوحة التحكم",
          href: "/admin",
          icon: LayoutDashboard,
        },
        {
          title: "إدارة المستخدمين",
          href: "/admin/users",
          icon: Users,
        },
        {
          title: "إعدادات النظام",
          href: "/admin/settings",
          icon: Settings,
        },
      ],
    },
    {
      title: "التقارير",
      items: [
        {
          title: "تحليلات المبيعات",
          href: "/admin/analytics",
          icon: BarChart2,
        },
        {
          title: "سجلات النشاط",
          href: "/admin/logs",
          icon: Bookmark,
        },
      ],
    },
  ],
};
