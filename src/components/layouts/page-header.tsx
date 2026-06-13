type PageHeaderProps = {
  title: string;
  subtitle?: string;
  align?: "start" | "center";
};

const PageHeader = ({ title, subtitle, align = "center" }: PageHeaderProps) => (
  <div className={`page-header page-header-${align} text-${align}`}>
    <h1 className="page-header-title mb-2">{title}</h1>
    {subtitle ? <p className="page-header-subtitle mb-0">{subtitle}</p> : null}
  </div>
);

export default PageHeader;
