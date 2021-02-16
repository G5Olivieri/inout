import { Transaction } from "@app/components/transactions/transaction"
import { format } from "date-fns"
import { useInternacionalization } from "@app/internacionalizations/use-internacionalization"

interface TransactionListItemProps {
  transaction: Transaction
}

export const TransactionListItem: React.FC<TransactionListItemProps> = ({ transaction }): JSX.Element => {
  const i18n = useInternacionalization()
  return (
    <li>
      { transaction.description }:&#160;
      { i18n.formatCurrency(transaction.value / 100) } -&#160;
      { format(transaction.date, "PP", { locale: i18n.getDateTimeLocale() }) }
    </li>
  )
}
