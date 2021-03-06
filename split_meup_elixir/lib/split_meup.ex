defmodule SplitMeup do
  @moduledoc """
  Split function without to use libraries (also without standard library).
  """

  @doc """
  Split a string looking a delimiter while check each byte and split items.

  ## Examples

      iex> SplitMeup.split("a,b,c", ",")
      ["a", "b", "c"]

      iex> SplitMeup.split "aabccc", "bc"
      ["aa", "cc"]

      iex> SplitMeup.split(",a,b,c", ",")
      ["", "a", "b", "c"]

      iex> SplitMeup.split(",a,b,c,", ",")
      ["", "a", "b", "c", ""]

      iex> SplitMeup.split("", "")
      []

  """
  def split("", _), do: []
  def split(text, delimiter) do
    split_all(delimiter, text, delimiter)
  end

  defp split_all(delimiter, text, delimiter_remain, item \\ "", ignored \\ "", result \\ [])
  # It has delimiter just in the end
  defp split_all(delimiter, "", "", item, ignored, result) when delimiter == ignored do
    # With this it's same way like when delimiter is just in start of string
    result ++ [item, ""]
  end
  # End of text to split
  defp split_all(delimiter, "", _delimiter_remain, item, ignored, result) do
    # Ignored could be a delimiter, then ignore it or partial delimiter, then a item
    if ignored == delimiter do
      result ++ [item]
    else
      result ++ [item <> ignored]
    end
  end
  # Delimiter found
  defp split_all(delimiter, text_remain, _delimiter_remain, item, ignored, result) when delimiter == ignored do
    # Delimiter ignored, continue for next item
    split_all(delimiter, text_remain, delimiter, "", "", result ++ [item])
  end
  # Check delimiter and text byte by byte until find each delimiter in text
  defp split_all(delimiter, <<first_text::size(8), text_remain::binary>>, delimiter_remain, item, ignored, result) do
    <<first_delimiter::size(8), delimiter_remain::binary>> = delimiter_remain
    # Save partial delimiter as ignore and use ignore as part of item when match is not full
    if first_text == first_delimiter do
      ignored = ignored <> <<first_text>>
      split_all(delimiter, text_remain, delimiter_remain, item, ignored, result)
    else
      item = item <> ignored <> <<first_text>>
      split_all(delimiter, text_remain, delimiter, item, "", result)
    end
  end
end
